import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  message: string;
  timestamp?: string;
  isSender: boolean;
  showHeart?: boolean;
  showSent?: boolean;
  isUnderlined?: boolean;
};

export function ChatBubble({ 
  message, 
  timestamp, 
  isSender, 
  showHeart,
  showSent,
  isUnderlined
}: Props) {
  return (
    <View style={[
      styles.container,
      isSender ? styles.senderContainer : styles.receiverContainer
    ]}>
      {!isSender && (
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} 
          style={styles.avatar} 
        />
      )}
      <View style={styles.bubbleWrapper}>
        <View style={[
          styles.bubble,
          isSender ? styles.senderBubble : styles.receiverBubble
        ]}>
          <Text style={[
            styles.messageText,
            isSender ? styles.senderText : styles.receiverText,
            isUnderlined && styles.underlinedText
          ]}>
            {message}
          </Text>
        </View>
        {showHeart && (
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={20} color="#8E8E8E" />
          </TouchableOpacity>
        )}
        {showSent && (
          <View style={styles.sentContainer}>
            <Ionicons name="checkmark-done" size={16} color="#0095F6" />
            <Text style={styles.sentText}>Sent</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  bubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
  },
  senderBubble: {
    backgroundColor: '#0095F6',
  },
  receiverBubble: {
    backgroundColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: '#fff',
  },
  receiverText: {
    color: '#000',
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  heartButton: {
    marginLeft: 8,
  },
  sentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  sentText: {
    fontSize: 14,
    color: '#0095F6',
    marginLeft: 4,
  },
});