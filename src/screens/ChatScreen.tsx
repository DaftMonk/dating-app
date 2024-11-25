import { useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app-types/navigation";
import { ChatBubble } from "components/ChatBubble";
import { SuggestedMessage } from "components/SuggestedMessage";
import { MessageInput } from "components/MessageInput";
import BACK_ICON from "@svgs/back.svg";
import VIDEO_ICON from "@svgs/video.svg";
import MENU_BOTTOM from "@svgs/menu-bottom.svg";
import { colors, fonts } from "@constants";
import { useApp } from "../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

export function ChatScreen({ route, navigation }: Props) {
  const { messages, setMessages } = useApp();
  const chatMessages = messages[route.params.matchId] || [];
  const [showShuffle, setShowShuffle] = useState(true);

  const handleSend = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      isSender: true,
      showSent: true,
      isFlat: false,
      isSpace: false,
    };

    setMessages({
      ...messages,
      [route.params.matchId]: [...chatMessages, newMessage],
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <View style={styles.center}>
          <Image source={{ uri: route.params.photo }} style={styles.avatar} />
          <Text style={styles.name}>{route.params.name}</Text>
        </View>

        <View style={styles.row}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => navigation.navigate("Matches")}
        >
          <BACK_ICON height={30} width={30} />
        </TouchableOpacity>
        </View>


        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.videoButton}
            onPress={() => setShowShuffle(!showShuffle)}
          >
            <VIDEO_ICON height={30} width={30} fill="red" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MENU_BOTTOM height={30} width={30} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <ChatBubble {...item} profileImage={route.params.photo} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        ListFooterComponent={() => (
          showShuffle ? (
            <SuggestedMessage onSend={handleSend} />
          ) : null
        )}
      />

      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1000,
    elevation: 3,
  },
  left: {
    paddingHorizontal: 5,
  },
  center: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    fontSize: 12,
    color: colors.gray_ligtht,
    fontFamily: fonts.Proxima_Nova_Semibold,
    paddingTop: 2,
  },
  videoButton: {
    marginRight: 16,
  },
  messagesList: {
    paddingVertical: 16,
    width: "100%",
    paddingHorizontal: 8,
  },
});