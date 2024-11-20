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
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "@app-types/navigation";
import { ChatBubble } from "components/ChatBubble";
import { SuggestedMessage } from "components/SuggestedMessage";
import { MessageInput } from "components/MessageInput";
import BACK_ICON from "@svgs/back.svg";
import VIDEO_ICON from "@svgs/video.svg";
import MENU_BOTTOM from "@svgs/menu-bottom.svg";
import { colors, fonts } from "@constants";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const INITIAL_MESSAGES = [
  {
    id: "1",
    message: "Thursday it is!",
    isSender: false,
    showHeart: true,
    isFlat: false,
    showImage: false,
    isSpace: false,
  },
  {
    id: "2",
    message: "Where are we headed?",
    isSender: false,
    showHeart: true,
    isFlat: true,
    showImage: true,
    isSpace: true,
  },
  {
    id: "3",
    message: "Let's meet at Cellarmasters at 7:30",
    isSender: true,
    isFlat: false,
    isSpace: false,
  },
  {
    id: "4",
    message: "Wear a cute dress ;)",
    isSender: true,
    showHeart: true,
    isLiked: true,
    isFlat: true,
    isSpace: true,
  },
  {
    id: "5",
    message: "Ohh I like it 🥰 it's a date",
    isSender: false,
    showHeart: true,
    isFlat: false,
    showImage: true,
    isSpace: true,
  },
  {
    id: "6",
    message: "Perfect. Shoot me your phone number btw",
    isSender: true,
    showSent: true,
    isFlat: false,
    isSpace: true,
  },
  {
    id: "7",
    message: "3528173691",
    isSender: false,
    isUnderlined: true,
    showHeart: true,
    date: "Tue, Oct 29,",
    time: "1:14 AM",
    isFlat: false,
    showImage: true,
    isSpace: true,
  },
];

export function ChatScreen({ route, navigation }: Props) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >

<View style={styles.header}>
  <TouchableOpacity
    style={styles.left}
    onPress={() => navigation.goBack()}
  >
    <BACK_ICON height={30} width={30} />
  </TouchableOpacity>

  <View style={styles.center}>
    <Image source={{ uri: route.params.photo }} style={styles.avatar} />
    <Text style={styles.name}>{route.params.name}</Text>
  </View>

  <View style={styles.row}>
    <TouchableOpacity style={styles.videoButton}>
      <VIDEO_ICON height={30} width={30} />
    </TouchableOpacity>
    <TouchableOpacity>
      <MENU_BOTTOM height={30} width={30} />
    </TouchableOpacity>
  </View>
</View>



      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatBubble {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        ListFooterComponent={() => (
          <SuggestedMessage message="Just wanted to say hi! What are your plans for the day?" />
        )}
      />

      <MessageInput
        onSend={(message) => {
          setMessages([
            ...messages,
            {
              id: Date.now().toString(),
              message,
              isSender: true,
              showSent: true,
              isFlat: false,
              isSpace: false,
            },
          ]);
        }}
      />
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
    paddingVertical: 28,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#ffffff",
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1000,
    // Add elevation for Android
    elevation: 3,
  },
  center: {
    position: "absolute", // Place the center content absolutely
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
  },
  left: {
    paddingHorizontal: 5,
  },
  col: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    fontSize: 14, // Slightly larger font for better readability
    color: colors.gray_ligtht,
    fontFamily: fonts.Proxima_Nova_Semibold,
    paddingTop: 4,
  },
  videoButton: {
    marginRight: 16,
    tintColor: "red", // Add red tint to the video icon
  },
  messagesList: {
    paddingVertical: 16,
    width: "100%",
    paddingHorizontal: 8,
  },
});
