import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
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
  profileImage?: string;
};

const screenWidth = Dimensions.get('window').width;
const MAX_BUBBLE_WIDTH = screenWidth * 0.7; // Reduced to accommodate heart

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
  profileImage,
}: Props) {
  return (
    <View>
      {date && time && (
        <Text style={styles.date}>
          {date} <Text style={styles.time}>{time}</Text>
        </Text>
      )}
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.container,
            isSender ? styles.senderContainer : styles.receiverContainer,
            { marginVertical: isSpace ? 8 : 4 }
          ]}
        >
          {!isSender && showImage && (
            <Image
              source={{
                uri: profileImage,
              }}
              style={styles.avatar}
            />
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
        {showHeart && (
          <TouchableOpacity style={styles.heartButton}>
            {isLiked ? (
              <HEART_LIKE height={24} width={24} color={colors.primary} />
            ) : (
              <HEART_UNLIKE height={24} width={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {showSent && (
        <View style={[styles.sentContainer, isSender && styles.sentContainerRight]}>
        
                  <SENT height={30} width={30} />
                  <PLUS height={10} width={10} style={styles.plus} />
          <Text style={styles.sentText}>Sent</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 25,
    marginRight: 8,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    maxWidth: MAX_BUBBLE_WIDTH,
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
    color: 'white',
  },
  receiverText: {
    color: '#000',
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  heartButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  sentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 4,
    alignSelf: "flex-end",
    paddingTop: 0,
  },
  sentContainerRight: {
    alignSelf: 'flex-end',
  },

  plus: {
    position: "absolute",
    top: 5,
    right: 37,
  },
  sentText: {
    fontSize: 13,
    color: colors.gray_darker,
    marginLeft: 14,
    paddingLeft: 4,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  date: {
    fontSize: 13,
    fontFamily: fonts.Proxima_Nova_Semibold,
    color: colors.timestamp_black,
    alignSelf: 'center',
    marginVertical: 8,
  },
  time: {
    fontFamily: fonts.Proxima_Nova_Regular,
    fontSize: 12,
  },
});