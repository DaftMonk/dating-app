import { Profile } from "@app-types/types";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { colors, fonts } from '@constants';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../context/AppContext';
import { getCurrentDate, formatMatchDate } from '../utils/dateUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export function AdminScreen() {
  const { profiles, setProfiles, messages, setMessages } = useApp();
  const [chatText, setChatText] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [newProfile, setNewProfile] = useState<Partial<Profile>>({});
  const [imageUrl, setImageUrl] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [matchDate, setMatchDate] = useState(getCurrentDate());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setMatchDate(selectedDate);
    }
  };

  const handleAddMessage = () => {
    if (!selectedProfileId) {
      Alert.alert('Error', 'Please select a profile first');
      return;
    }

    const newMessages = chatText.split('\n').map((msg, index) => ({
      id: Date.now().toString() + index,
      message: msg.replace(/^You:\s*/, '').trim(),
      isSender: msg.startsWith('You:'),
      showHeart: !msg.startsWith('You:'),
      isFlat: index > 0,
      showImage: !msg.startsWith('You:'),
      isSpace: true,
    }));

    setMessages({
      ...messages,
      [selectedProfileId]: [...(messages[selectedProfileId] || []), ...newMessages],
    });
    setChatText('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProfile({ ...newProfile, photo: result.assets[0].uri });
      setImageUrl('');
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      setNewProfile({ ...newProfile, photo: imageUrl });
    }
  };

  const handleAddProfile = () => {
    if (!newProfile.name) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }
    if (!newProfile.photo) {
      Alert.alert('Error', 'Please add a photo or enter an image URL');
      return;
    }

    const profile: Profile = {
      id: Date.now().toString(),
      name: newProfile.name,
      photo: newProfile.photo,
      message: newProfile.message,
      hasCamera: newProfile.hasCamera,
      hasEmoji: newProfile.hasEmoji,
      showYourTurn: newProfile.showYourTurn,
      liked: newProfile.liked,
      online: newProfile.online,
      matchDate: matchDate,
    };

    setProfiles([profile, ...profiles]);
    setNewProfile({});
    setImageUrl('');
    setMatchDate(getCurrentDate());
  };

  const removeProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    const newMessages = { ...messages };
    delete newMessages[id];
    setMessages(newMessages);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Add Chat Messages</Text>
        <View style={styles.profileSelect}>
          <Text style={styles.label}>Select Profile:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {profiles.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={[
                  styles.profileChip,
                  selectedProfileId === profile.id && styles.selectedProfileChip,
                ]}
                onPress={() => setSelectedProfileId(profile.id)}
              >
                <Image source={{ uri: profile.photo }} style={styles.chipImage} />
                <Text style={styles.chipText}>{profile.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TextInput
          style={styles.textArea}
          multiline
          value={chatText}
          onChangeText={setChatText}
          placeholder="Paste chat messages here (prefix with 'You:' for sender messages)"
          placeholderTextColor={colors.gray_ligtht}
        />
        <TouchableOpacity 
          style={[styles.button, !selectedProfileId && styles.buttonDisabled]} 
          onPress={handleAddMessage}
        >
          <Text style={styles.buttonText}>Add Messages</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Add New Profile</Text>
        <TextInput
          style={styles.input}
          value={newProfile.name}
          onChangeText={(text) => setNewProfile({ ...newProfile, name: text })}
          placeholder="Name"
          placeholderTextColor={colors.gray_ligtht}
        />
        
        <View style={styles.imageInputContainer}>
          <TextInput
            style={styles.urlInput}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="Image URL"
            placeholderTextColor={colors.gray_ligtht}
          />
          <TouchableOpacity 
            style={styles.urlButton} 
            onPress={handleUrlSubmit}
          >
            <Text style={styles.buttonText}>Use URL</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>- OR -</Text>

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          {newProfile.photo ? (
            <Image source={{ uri: newProfile.photo }} style={styles.preview} />
          ) : (
            <Text style={styles.buttonText}>Pick Profile Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            Match Date: {formatMatchDate(matchDate)}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={matchDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, newProfile.online && styles.checkboxChecked]}
            onPress={() => setNewProfile({ ...newProfile, online: !newProfile.online })}
          />
          <Text style={styles.checkboxLabel}>Online</Text>
        </View>

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, newProfile.hasCamera && styles.checkboxChecked]}
            onPress={() => setNewProfile({ ...newProfile, hasCamera: !newProfile.hasCamera })}
          />
          <Text style={styles.checkboxLabel}>Has Camera</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, (!newProfile.name || !newProfile.photo) && styles.buttonDisabled]} 
          onPress={handleAddProfile}
        >
          <Text style={styles.buttonText}>Add Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Current Profiles ({profiles.length})</Text>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.profileItem}>
            <Image source={{ uri: profile.photo }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              {profile.message && (
                <Text style={styles.profileMessage}>{profile.message}</Text>
              )}
              <View style={styles.profileTags}>
                {profile.online && <View style={styles.tag}><Text style={styles.tagText}>Online</Text></View>}
                {profile.hasCamera && <View style={styles.tag}><Text style={styles.tagText}>Camera</Text></View>}
              </View>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeProfile(profile.id)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.Proxima_Nova_Bold,
    marginBottom: 16,
    color: 'black',
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.Proxima_Nova_Regular,
    color: 'black',
    marginBottom: 8,
  },
  profileSelect: {
    marginBottom: 12,
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray_reciever,
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedProfileChip: {
    backgroundColor: colors.blue_sender,
  },
  chipImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  chipText: {
    color: 'black',
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: colors.border_light,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: fonts.Proxima_Nova_Regular,
    fontSize: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border_light,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: fonts.Proxima_Nova_Regular,
    fontSize: 16,
  },
  imageInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  urlInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border_light,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontFamily: fonts.Proxima_Nova_Regular,
    fontSize: 16,
  },
  urlButton: {
    backgroundColor: colors.blue_sender,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
    color: colors.gray_dark,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  button: {
    backgroundColor: colors.blue_sender,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.Proxima_Nova_Bold,
  },
  imageButton: {
    height: 120,
    backgroundColor: colors.gray_reciever,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.blue_sender,
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: colors.blue_sender,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: fonts.Proxima_Nova_Regular,
    color: 'black',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: colors.bg_light,
    borderRadius: 8,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontFamily: fonts.Proxima_Nova_Bold,
    color: 'black',
  },
  profileMessage: {
    fontSize: 14,
    fontFamily: fonts.Proxima_Nova_Regular,
    color: colors.gray_dark,
    marginTop: 4,
  },
  profileTags: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tag: {
    backgroundColor: colors.blue_sender,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontFamily: fonts.Proxima_Nova_Regular,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.Proxima_Nova_Bold,
  },
  dateButton: {
    backgroundColor: colors.gray_reciever,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: fonts.Proxima_Nova_Regular,
    color: colors.gray_darker,
    textAlign: 'center',
  },
});