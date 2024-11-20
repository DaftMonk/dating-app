import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MUSIC from "@svgs/music.svg";
import LOAD from "@svgs/load.svg";
import GIF from "@svgs/gif.svg";
import CONTACT from "@svgs/contact.svg";
import { colors, fonts } from "@constants";

type Props = {
  onSend: (message: string) => void;
};

export function MessageInput({ onSend }: Props) {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            placeholderTextColor={colors.gray_ligtht}
          />

          <TouchableOpacity
            onPress={() => {
              onSend(message);
              setMessage("");
            }}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottom_menu}>
        <TouchableOpacity activeOpacity={0.6} style={styles.bottom_button}>
          <CONTACT height={45} width={45} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.bottom_button}>
          <GIF height={40} width={40} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.bottom_button}>
          <MUSIC height={40} width={40} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.bottom_button}>
          <LOAD height={40} width={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === "ios" ? 4 : 0,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bg_light,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 0.2,
    borderColor: colors.border_light,
  },
  input: {
    flex: 1,
    fontSize: 17,
    marginRight: 8,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  sendText: {
    color: colors.gray_dark,
    fontSize: 18,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  bottom_menu: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  bottom_button: {
    paddingRight: 5,
    paddingTop: 8,
  },
});
