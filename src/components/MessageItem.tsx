import { colors, fonts } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CAMERA_BLUE from "@svgs/camera_blue.svg";
import GOLDEN_HEART from "@svgs/golden_heart.svg";
import BACK_ARROW from "@svgs/arrow-back.svg";

type Props = {
  photo: string;
  name: string;
  message?: string;
  phoneNumber?: string;
  hasCamera?: boolean;
  hasEmoji?: boolean;
  showYourTurn?: boolean;
  liked?: boolean;
  onPress: () => void;
  online?: boolean;
};

export function MessageItem({
  photo,
  name,
  message,
  phoneNumber,
  hasCamera,
  hasEmoji,
  showYourTurn,
  liked,
  online,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        {online && <View style={styles.online} />}
        <Image source={{ uri: photo }} style={styles.photo} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Text style={styles.name}>{name}</Text>
            {liked && (
              <View style={styles.innerContainer}>
                <View style={styles.liked_you}></View>
                <Text style={styles.liked}>Likes you</Text>
              </View>
            )}
          </View>
          {hasCamera && (
            <CAMERA_BLUE height={24} width={24} style={styles.cameraIcon} />
          )}
          {hasEmoji && (
            <GOLDEN_HEART
              height={38}
              width={38}
              style={styles.emojiContainer}
            />
          )}
        </View>
        {phoneNumber ? (
          <Text
            style={[
              styles.phoneNumber,
              { paddingTop: hasCamera || hasEmoji ? 0 : 8 },
            ]}
          >
            {phoneNumber}
          </Text>
        ) : (
          <View style={styles.messageContainer}>
            <BACK_ARROW
              height={10}
              width={10}
              color={"#8E8E8E"}
              style={styles.replyIcon}
            />
            <Text style={styles.message} numberOfLines={1}>
              {message}
            </Text>
          </View>
        )}
      </View>
      {showYourTurn && (
        <View style={styles.yourTurn}>
          <Text style={styles.yourTurnText}>Your Turn</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liked_you: {
    backgroundColor: colors.gold,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 2,
    transform: [{ skewX: "-20deg" }],
    width: 78,
    height: 20,
  },
  liked: {
    fontSize: 12,
    color: "black",
    fontFamily: fonts.Proxima_Nova_Bold,
    textTransform: "uppercase",
    position: "absolute",
    top: 3,
    alignSelf: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.Proxima_Nova_Bold,
    color: "black",
    marginRight: 8,
  },
  cameraIcon: {
    marginRight: 2,
  },
  emojiContainer: {
    marginRight: 2,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  replyIcon: {
    marginRight: 5,
  },
  message: {
    fontSize: 16,
    color: "#8E8E8E",
    flex: 1,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  phoneNumber: {
    fontSize: 14,
    color: "#8E8E8E",
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  yourTurn: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  
  },
  yourTurnText: {
    color: "white",
    fontSize: 11,
    fontFamily: fonts.Proxima_Nova_Bold,
  },
  innerContainer: {
    marginRight: 10,
  },
  online: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: colors.online,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    top: 30,
    right: 0,
  },
});
