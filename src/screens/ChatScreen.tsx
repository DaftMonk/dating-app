import { useState } from 'react';
import { 
  View, 
  FlatList, 
  Image, 
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/navigation';
import { ChatBubble } from '@/components/ChatBubble';
import { MessageInput } from '@/components/MessageInput';
import { SuggestedMessage } from '@/components/SuggestedMessage';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const INITIAL_MESSAGES = [
  { id: '1', message: 'Thursday it is!', isSender: false },
  { id: '2', message: 'Where are we headed?', isSender: false },
  { id: '3', message: "Let's meet at Cellarmasters at 7:30", isSender: true },
  { id: '4', message: 'Wear a cute dress ;)', isSender: true },
  { id: '5', message: "Ohh I like it 🥰 it's a date", isSender: false },
  { id: '6', message: 'Perfect. Shoot me your phone number btw', isSender: true, showSent: true },
  { id: '7', message: '3528173691', isSender: false, isUnderlined: true },
];

export function ChatScreen({ route, navigation }: Props) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Image 
          source={{ uri: route.params.photo }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>{route.params.name}</Text>
        <TouchableOpacity style={styles.videoButton}>
          <Ionicons name="videocam" size={24} color="#0095F6" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble {...item} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <SuggestedMessage 
        message="Just wanted to say hi! What are your plans for the day?"
      />
      
      <MessageInput onSend={(message) => {
        setMessages([
          ...messages,
          {
            id: Date.now().toString(),
            message,
            isSender: true,
            showSent: true,
          },
        ]);
      }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    backgroundColor: "#ffffff",
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1000,
    // Add elevation for Android
    elevation: 3,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  videoButton: {
    marginRight: 16,
  },
  messagesList: {
    padding: 16,
  },
});