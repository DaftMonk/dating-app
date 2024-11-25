
import { Profile } from "@app-types/types";

export const DEFAULT_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Sophie",
    photo: "https://randomuser.me/api/portraits/women/32.jpg",
    liked: true,
    online: true,
    hasCamera: true
  },
  {
    id: "2",
    name: "Emma",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    hasCamera: true,
    online: false
  },
  {
    id: "3",
    name: "Olivia",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    online: false,
    hasEmoji: true
  },
  {
    id: "4",
    name: "Isabella",
    photo: "https://randomuser.me/api/portraits/women/75.jpg",
    hasCamera: true,
    liked: true
  },
  {
    id: "5",
    name: "Mia",
    photo: "https://randomuser.me/api/portraits/women/89.jpg",
    online: true
  },
  {
    id: "6",
    name: "Charlotte",
    photo: "https://randomuser.me/api/portraits/women/91.jpg",
    hasEmoji: true
  }
];