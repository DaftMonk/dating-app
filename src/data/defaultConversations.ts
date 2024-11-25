import { ChatMessage } from "@app-types/types";

type ConversationTemplate = {
  id: string;
  messages: ChatMessage[];
};

export const DEFAULT_CONVERSATIONS: ConversationTemplate[] = [
  {
    id: "convo1",
    messages: [
      {
        id: "1",
        message: "Hey! Your hiking photos are amazing 🏔️",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true,
        date: "Tuesday, October 29"
      },
      {
        id: "2",
        message: "Thanks! I'm a bit of an adventure junkie 😊",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true
      },
      {
        id: "3",
        message: "That waterfall shot is incredible! Where was that?",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true
      },
      {
        id: "4",
        message: "That's from my trip to Iceland last summer!",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true
      },
      {
        id: "5",
        message: "Would love to hear more about your travels over coffee ☕",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true,
        date: "Wednesday, October 30"
      }
    ]
  },
  {
    id: "convo2",
    messages: [
      {
        id: "1",
        message: "I see you're a fellow foodie! 🍝",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true,
        date: "Monday, October 28"
      },
      {
        id: "2",
        message: "Guilty as charged! Love trying new restaurants",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true
      },
      {
        id: "3",
        message: "Have you tried that new Italian place downtown?",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true
      },
      {
        id: "4",
        message: "Not yet! Been meaning to check it out",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true
      }
    ]
  },
  {
    id: "convo3",
    messages: [
      {
        id: "1",
        message: "That concert looked amazing! 🎸",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true,
        date: "Sunday, October 27"
      },
      {
        id: "2",
        message: "It was incredible! The energy was unreal",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true
      },
      {
        id: "3",
        message: "What's your favorite band?",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true
      }
    ]
  },
  {
    id: "convo4",
    messages: [
      {
        id: "1",
        message: "Your dog is adorable! What's their name? 🐕",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true,
        date: "Friday, October 25"
      },
      {
        id: "2",
        message: "That's Luna! She's a 2-year-old husky mix 🐾",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true
      },
      {
        id: "3",
        message: "Would she like to join us for a walk in the park?",
        isSender: true,
        showSent: true,
        isFlat: false,
        isSpace: true
      },
      {
        id: "4",
        message: "She'd love that! When were you thinking?",
        isSender: false,
        showHeart: true,
        isFlat: false,
        showImage: true,
        isSpace: true,
        date: "Saturday, October 26"
      }
    ]
  }
];