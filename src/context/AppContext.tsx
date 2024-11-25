import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatMessage, Profile } from '@app-types/types';
import { DEFAULT_PROFILES } from '@app-data/defaultProfiles';
import { DEFAULT_CONVERSATIONS } from '@app-data/defaultConversations';
import { NEW_MATCHES_DATA } from '@app-data/newMatches';

type AppContextType = {
  profiles: Profile[];
  setProfiles: (profiles: Profile[]) => void;
  messages: Record<string, ChatMessage[]>;
  setMessages: (messages: Record<string, ChatMessage[]>) => void;
  resetToDefaults: () => void;
  likesCount: number;
  blurredProfile: string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [likesCount, setLikesCount] = useState(0);
  const [blurredProfile, setBlurredProfile] = useState('');

  const resetToDefaults = () => {
    // Start with new matches
    const selectedNewMatches = [...NEW_MATCHES_DATA]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2); // Always include 2 new matches

    // Add some profiles with conversations
    const numConversations = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selectedProfiles = [...DEFAULT_PROFILES]
      .sort(() => Math.random() - 0.5)
      .slice(0, numConversations);

    // Combine profiles, putting new matches first
    const allProfiles = [...selectedNewMatches, ...selectedProfiles];
    setProfiles(allProfiles);

    // Assign conversations only to profiles from DEFAULT_PROFILES
    const selectedConversations = [...DEFAULT_CONVERSATIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, numConversations);

    const newMessages: Record<string, ChatMessage[]> = {};
    selectedProfiles.forEach((profile, index) => {
      newMessages[profile.id] = selectedConversations[index].messages;
    });
    setMessages(newMessages);

    // Randomize likes count (between 15-99)
    setLikesCount(Math.floor(Math.random() * 85) + 15);

    // Randomly select a profile image for the blurred card
    const allProfilesForBlur = [...NEW_MATCHES_DATA, ...DEFAULT_PROFILES];
    const randomProfile = allProfilesForBlur[Math.floor(Math.random() * allProfilesForBlur.length)];
    setBlurredProfile(randomProfile.photo);
  };

  // Initialize with random defaults on first load
  useEffect(() => {
    resetToDefaults();
  }, []);

  return (
    <AppContext.Provider value={{ 
      profiles, 
      setProfiles, 
      messages, 
      setMessages,
      resetToDefaults,
      likesCount,
      blurredProfile
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};