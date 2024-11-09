import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  photo: string;
  name: string;
  message?: string;
  phoneNumber?: string;
  hasCamera?: boolean;
  hasEmoji?: boolean;
  showYourTurn?: boolean;
  onPress: () => void;
};

export function MessageItem({
  photo,
  name,
  message,
  phoneNumber,
  hasCamera,
  hasEmoji,
  showYourTurn,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {hasCamera && (
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          )}
          {hasEmoji && (
            <View style={styles.emojiContainer}>
              <Text>✨💛</Text>
            </View>
          )}
        </View>
        {phoneNumber ? (
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        ) : (
          <View style={styles.messageContainer}>
            <Ionicons 
              name="return-up-back-outline" 
              size={16} 
              color="#8E8E8E" 
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
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  cameraIcon: {
    backgroundColor: '#0095F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  emojiContainer: {
    marginLeft: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    marginRight: 4,
  },
  message: {
    fontSize: 14,
    color: '#8E8E8E',
    flex: 1,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#8E8E8E',
    textDecorationLine: 'underline',
  },
  yourTurn: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  yourTurnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});