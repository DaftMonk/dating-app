import { RootStackParamList } from "@app-types/navigation";
import { colors, fonts } from "@constants";
import { gray_darker } from "@constants/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BACK_ICON from "@svgs/back.svg";
import MENU_BOTTOM from "@svgs/menu-bottom.svg";
import VIDEO_ICON from "@svgs/video.svg";
import { ChatBubble } from "components/ChatBubble";
import { MessageInput } from "components/MessageInput";
import { SuggestedMessage } from "components/SuggestedMessage";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useApp } from "../context/AppContext";
import CAMERA_BLUE from "@svgs/camera_blue.svg";
import { MatchedWith } from "components/MatchedWith";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

export function ChatScreen({ route, navigation }: Props) {
  const { messages, setMessages } = useApp();
  const chatMessages = messages[route.params.matchId] || [];
  const [showShuffle, setShowShuffle] = useState(true);
  const [isFlatListEnabled, setIsFlatListEnabled] = useState(false);

  const { isNewMatch, photo, name } = route.params;


  const enableFlatList = () => {
    setIsFlatListEnabled(true);
  };

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
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.center}>
          <Image source={{ uri: route.params.photo }} style={styles.avatar} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{route.params.name + " "}</Text>
            
            {
              route.params.isNewMatch ? <CAMERA_BLUE height={14} width={14} /> : <></>
            }
            
          </View>
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

      <View style={styles.content}>
      {isNewMatch && !isFlatListEnabled ? (
        <MatchedWith profileImage={photo} enableMessages={enableFlatList} />
      ) : (chatMessages.length === 0 && !isNewMatch) ? (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>No messages yet!</Text>
        </View>
      ) : (
        <FlatList
          data={chatMessages}
          renderItem={({ item }) => (
            <ChatBubble {...item} profileImage={photo} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          ListHeaderComponent={() =>
            isNewMatch ? (
              <Text style={styles.matchedText}>
                You matched with {name} 11/5/24
              </Text>
            ) : (
              <></>
            )
          }
          ListFooterComponent={() =>
            (showShuffle && !isNewMatch) ? <SuggestedMessage onSend={() => {}} /> : null
          }
        />
      )}

      <MessageInput onSend={() => {}} />
    </View>

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
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  matchedText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: fonts.Proxima_Nova_Regular,
    marginBottom: 0,
    marginTop: -5,
    textAlign: "center",
    color: gray_darker,
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
  content: {
    flex: 1, // Ensures this section fills the remaining vertical space
  },
  messagesList: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  fallbackContainer: {
    flex: 1, // Occupies the entire space if there are no messages
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: colors.gray_ligtht,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
});
