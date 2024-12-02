import { ChatMessage } from "@app-types/types";

export type MessageGroup = {
  id: string;
  messages: ChatMessage[];
  isSender: boolean;
  showImage?: boolean;
};

export function groupMessages(messages: ChatMessage[]): MessageGroup[] {
  return messages.reduce((groups: MessageGroup[], message, index) => {
    const prevMessage = messages[index - 1];
    const isFirstMessage = index === 0;
    const isNewGroup = isFirstMessage || prevMessage.isSender !== message.isSender;

    if (isNewGroup) {
      groups.push({
        id: message.id,
        messages: [message],
        isSender: message.isSender,
        showImage: !message.isSender
      });
    } else {
      const currentGroup = groups[groups.length - 1];
      currentGroup.messages.push(message);
    }

    return groups;
  }, []);
}