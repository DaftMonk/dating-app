import { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onSend: (message: string) => void;
};

export function MessageInput({ onSend }: Props) {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.emojiButton}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.gifText}>GIF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="musical-note" size={24} color="#8E8E8E" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            placeholderTextColor="#8E8E8E"
          />
          {message ? (
            <TouchableOpacity 
              onPress={() => {
                onSend(message);
                setMessage('');
              }}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Ionicons name="mic" size={24} color="#8E8E8E" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 34 : 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  button: {
    marginRight: 8,
  },
  emojiButton: {
    fontSize: 24,
  },
  gifText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E8E',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  sendText: {
    color: '#0095F6',
    fontSize: 16,
    fontWeight: '600',
  },
});