import { StyleSheet, View } from "react-native";
import { ChatBubble } from "./ChatBubble";
import { MessageGroup } from "../utils/messageUtils";

type Props = {
  group: MessageGroup;
  profileImage?: string;
};

export function MessageGroupView({ group, profileImage }: Props) {
  return (
    <View style={styles.container}>
      {group.messages.map((message, index) => (
        <ChatBubble
          key={message.id}
          {...message}
          showImage={index === group.messages.length - 1 ? group.showImage : false}
          isFlat={index > 0}
          profileImage={profileImage}
          isLastInGroup={index === group.messages.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
});