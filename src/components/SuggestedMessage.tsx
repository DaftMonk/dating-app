import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  message: string;
};

export function SuggestedMessage({ message }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="refresh" size={20} color="#8E8E8E" />
      <Text style={styles.tapText}>Tap to shuffle</Text>
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
    padding: 16,
    alignItems: 'center',
  },
  tapText: {
    color: '#8E8E8E',
    fontSize: 12,
    marginTop: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    padding: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  message: {
    flex: 1,
    color: '#000',
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendText: {
    color: '#0095F6',
    fontWeight: '600',
  },
  suggestedText: {
    color: '#8E8E8E',
    fontSize: 12,
  },
});