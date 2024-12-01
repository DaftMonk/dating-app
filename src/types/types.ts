export type Profile = {
  id: string;
  name: string;
  photo: string;
  message?: string;
  phoneNumber?: string;
  hasCamera?: boolean;
  hasEmoji?: boolean;
  showYourTurn?: boolean;
  liked?: boolean;
  online?: boolean;
  matchDate?: Date;
};

export type ChatMessage = {
  id: string;
  message: string;
  isSender: boolean;
  showHeart?: boolean;
  isLiked?: boolean;
  showSent?: boolean;
  isUnderlined?: boolean;
  isFlat?: boolean;
  showImage?: boolean;
  isSpace?: boolean;
  date?: string;
  time?: string;
};