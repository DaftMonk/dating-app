import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import HEART_LIKE from "@svgs/like.svg";
import HEART_UNLIKE from "@svgs/unlike.svg";
import SENT from "@svgs/sent.svg";
import PLUS from "@svgs/add.svg";
import { colors, fonts } from "@constants";

const screenWidth = Dimensions.get('window').width;
const MAX_BUBBLE_WIDTH = screenWidth * 0.7;

type Props = {
  message: string;
  date?: string;
  isSender: boolean;
  showHeart?: boolean;
  isLiked?: boolean;
  showSent?: boolean;
  isUnderlined?: boolean;
  isFlat?: boolean;
  showImage?: boolean;
  isSpace?: boolean;
  profileImage?: string;
};

export function ChatBubble({
  message,
  date,
  isSender,
  showHeart,
  showSent,
  isUnderlined,
  isLiked,
  isFlat,
  showImage,
  isSpace,
  profileImage,
}: Props) {
  return (
    <View>
      {date && (
        <Text style={styles.date}>{date}</Text>
      )}
      <View
        style={[
          styles.container,
          isSender
            ? {
                ...styles.senderContainer,
                marginTop: isSpace ? 4 : 0,
                marginBottom: isSpace ? 8 : 0,
              }
            : { ...styles.receiverContainer, marginBottom: isSpace ? 6 : -2 },
        ]}
      >
        <View style={styles.bubbleWrapper}>
          <View>
            <View style={styles.row}>
              {!isSender && (
                <>
                  {showImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatar} />
                  )}
                </>
              )}
              <View
                style={[
                  styles.bubble,
                  isSender
                    ? {
                        ...styles.senderBubble,
                        borderTopRightRadius: isFlat ? 4 : 20,
                      }
                    : {
                        ...styles.receiverBubble,
                        borderTopLeftRadius: isFlat ? 4 : 20,
                      },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isSender ? styles.senderText : styles.receiverText,
                    isUnderlined && styles.underlinedText,
                  ]}
                >
                  {message}
                </Text>
              </View>
            </View>
            {showSent && (
              <View style={styles.sentContainer}>
                <View>
                  <SENT height={30} width={30} />
                  <PLUS height={10} width={10} style={styles.plus} />
                </View>
                <Text style={styles.sentText}>Sent</Text>
              </View>
            )}
          </View>
        </View>
        {showHeart && (
          <TouchableOpacity style={styles.heartButton}>
            {isLiked ? (
              <HEART_LIKE height={26} width={26} color={colors.primary} />
            ) : (
              <HEART_UNLIKE height={26} width={26} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  senderContainer: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    maxWidth: MAX_BUBBLE_WIDTH,
  },
  receiverContainer: {
    alignSelf: "flex-start",
    maxWidth: MAX_BUBBLE_WIDTH,
  },
  bubbleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    maxWidth: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    paddingVertical: 10,
    maxWidth: "100%",
  },
  senderBubble: {
    backgroundColor: colors.blue_sender,
    borderBottomRightRadius: 4,
  },
  receiverBubble: {
    backgroundColor: colors.gray_reciever,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    letterSpacing: 0.3,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  senderText: {
    color: "white",
  },
  receiverText: {
    color: "#000",
  },
  underlinedText: {
    textDecorationLine: "underline",
  },
  heartButton: {
    marginHorizontal: 8,
  },
  sentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 4,
    alignSelf: "flex-end",
    paddingTop: 5,
  },
  plus: {
    position: "absolute",
    top: 1,
    right: -10,
  },
  sentText: {
    fontSize: 14,
    color: colors.gray_darker,
    marginLeft: 4,
    paddingLeft: 12,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  date: {
    fontSize: 13,
    fontFamily: fonts.Proxima_Nova_Semibold,
    color: colors.timestamp_black,
    marginVertical: 16,
    textAlign: "center",
  },
});