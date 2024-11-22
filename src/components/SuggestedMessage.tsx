import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import REFRESH from "@svgs/refresh.svg";
import { colors, fonts } from "@constants";

type Props = {
  message: string;
};

export function SuggestedMessage({ message }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <REFRESH height={20} width={20} />
        <Text style={styles.tapText}>Tap to shuffle</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.sendButton}>
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
