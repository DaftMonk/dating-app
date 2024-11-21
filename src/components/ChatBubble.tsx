import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import HEART_LIKE from "@svgs/like.svg";
import HEART_UNLIKE from "@svgs/unlike.svg";
import SENT from "@svgs/sent.svg";
import PLUS from "@svgs/add.svg";
import { colors, fonts } from "@constants";

type Props = {
  message: string;
  date?: string;
  time?: string;
  isSender: boolean;
  showHeart?: boolean;
  isLiked?: boolean;
  showSent?: boolean;
  isUnderlined?: boolean;
  isFlat?: boolean;
  showImage?: boolean;
  isSpace?: boolean;
};

export function ChatBubble({
  message,
  date,
  time,
  isSender,
  showHeart,
  showSent,
  isUnderlined,
  isLiked,
  isFlat,
  showImage,
  isSpace,
}: Props) {
  return (
    <View>
      {date && time && (
        <Text style={styles.date}>
          {date} <Text style={styles.time}>{time}</Text>
        </Text>
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
                      source={{
                        uri: "https://randomuser.me/api/portraits/women/1.jpg",
                      }}
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
  },
  receiverContainer: {
    alignSelf: "flex-start",
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
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    paddingVertical: 7,
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
    letterSpacing: 0.6,
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
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  time: {
    fontFamily: fonts.Proxima_Nova_Regular,
    fontSize: 12,
  },
});
