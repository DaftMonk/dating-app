import { View, FlatList, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/navigation';
import { MessageItem } from '@/components/MessageItem';
import { NewMatchCard } from '@/components/NewMatchCard';
import { SectionHeader } from '@/components/SectionHeader';
import { MATCHES_DATA } from '@/data/matches';
import { NEW_MATCHES_DATA } from '@/data/newMatches';

type Props = NativeStackScreenProps<RootStackParamList, 'Matches'>;

export function MatchesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/tinder-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.shieldContainer}>
            <Ionicons 
              name="shield" 
              size={24} 
              color="#8E8E8E"
            />
          </View>
        </View>
      </View>

      <ScrollView>
        <SectionHeader title="New Matches" />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.newMatchesContainer}
        >
          <View style={styles.likesCard}>
            <Text style={styles.likesCount}>25</Text>
            <Text style={styles.likesText}>Likes</Text>
          </View>
          {NEW_MATCHES_DATA.map((match) => (
            <NewMatchCard
              key={match.id}
              photo={match.photo}
              name={match.name}
              hasCamera={match.hasCamera}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Messages" />
        <FlatList
          data={MATCHES_DATA}
          renderItem={({ item }) => (
            <MessageItem
              photo={item.photo}
              name={item.name}
              message={item.message}
              phoneNumber={item.phoneNumber}
              hasCamera={item.hasCamera}
              hasEmoji={item.hasEmoji}
              showYourTurn={item.showYourTurn}
              onPress={() => navigation.navigate('Chat', {
                matchId: item.id,
                name: item.name,
                photo: item.photo,
              })}
            />
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
      
      <View style={styles.tabBar}>
        <Ionicons name="flame" size={28} color="#E0E0E0" />
        <Ionicons name="search" size={28} color="#E0E0E0" />
        <View style={styles.starContainer}>
          <Ionicons name="star" size={28} color="#E0E0E0" />
          <View style={styles.starBadge}>
            <Text style={styles.starBadgeText}>25</Text>
          </View>
        </View>
        <Ionicons name="chatbubbles" size={28} color="#FF4458" />
        <Ionicons name="person" size={28} color="#E0E0E0" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    // Add shadow for iOS
    zIndex: 1000,
    // Add elevation for Android
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerContent: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 60,
    width: 100,
  },
  shield: {
    marginLeft: 'auto',
  },
  newMatchesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  likesCard: {
    width: 100,
    height: 130,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  likesCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  likesText: {
    fontSize: 16,
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  starContainer: {
    position: 'relative',
  },
  starBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFB800',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  shieldContainer: {
    paddingRight: 16,
    zIndex: 2,
    marginLeft: 'auto',
  },
  starBadgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});