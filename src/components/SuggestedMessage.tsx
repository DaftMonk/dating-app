import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import REFRESH from "@svgs/refresh.svg";
import { colors, fonts } from "@constants";
import { useState } from "react";

const SUGGESTED_MESSAGES = [
  "Just wanted to say hi! What are your plans for the day?",
  "Hey there! Your profile caught my eye. What's your favorite local spot?",
  "Hi! Love your travel photos. Which place was your favorite?",
  "Hey! I noticed we both love hiking. Have you tried any good trails lately?",
  "Your dog is adorable! What's their name?",
  "I see you're into photography too! What camera do you use?",
  "That food pic looks amazing! Is that from a local restaurant?",
  "Your music taste is great! Have you been to any good concerts lately?",
  "Hi there! Coffee or tea person?",
  "Love your style! Where's your favorite place to shop?"
];

type Props = {
  onSend?: (message: string) => void;
};

export function SuggestedMessage({ onSend }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShuffle = () => {
    setCurrentIndex((prev) => (prev + 1) % SUGGESTED_MESSAGES.length);
  };

  const currentMessage = SUGGESTED_MESSAGES[currentIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={handleShuffle}>
        <REFRESH height={20} width={20} />
        <Text style={styles.tapText}>Tap to shuffle</Text>
      </TouchableOpacity>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>{currentMessage}</Text>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={() => onSend?.(currentMessage)}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.suggestedText}>Suggested Message</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 4,
    width: "72%",
    alignSelf: "flex-end",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  tapText: {
    color: colors.gray_darker,
    fontSize: 14,
    paddingLeft: 2,
    fontFamily: fonts.Proxima_Nova_Bold,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 18,
    borderWidth: 2.2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  message: {
    flex: 1,
    color: colors.gray_darker,
    fontSize: 14,
    fontFamily: fonts.Proxima_Nova_Semibold,
  },
  sendButton: {
    paddingLeft: 8,
  },
  sendText: {
    color: colors.blue_dark,
    fontWeight: "800",
  },
  suggestedText: {
    alignSelf: "flex-end",
    color: colors.gray_dark,
    fontSize: 12,
    fontFamily: fonts.Proxima_Nova_Bold,
    paddingTop: 8,
  },
});