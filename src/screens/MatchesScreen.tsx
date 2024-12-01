import { MATCHES_DATA } from "@app-data/matches";
import { NEW_MATCHES_DATA } from "@app-data/newMatches";
import { RootStackParamList } from "@app-types/navigation";
import { colors, fonts } from "@constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CHAT from "@svgs/chat.svg";
import FLAME from "@svgs/flame.svg";
import GOLDEN_HEART from "@svgs/golden_heart.svg";
import PROFILE from "@svgs/profile.svg";
import SEARCH from "@svgs/search.svg";
import SHIELD from "@svgs/shield.svg";
import STAR from "@svgs/star.svg";
import { MessageItem } from "components/MessageItem";
import { NewMatchCard } from "components/NewMatchCard";
import { SectionHeader } from "components/SectionHeader";
import { BlurView } from "expo-blur";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useApp } from "../context/AppContext";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, "Matches">;

export function MatchesScreen({ navigation }: Props) {
  const { profiles, messages, likesCount, blurredProfile } = useApp();

  const getLastMessage = (profileId: string) => {
    const chatMessages = messages[profileId] || [];
    return chatMessages[chatMessages.length - 1]?.message;
  };

  const isLastMessageFromUser = (profileId: string) => {
    const chatMessages = messages[profileId] || [];
    return chatMessages[chatMessages.length - 1]?.isSender || false;
  };

  const shouldShowYourTurn = (profileId: string) => {
    const chatMessages = messages[profileId] || [];
    const lastMessage = chatMessages[chatMessages.length - 1];
    return lastMessage && !lastMessage.isSender;
  };

  const hasMessages = (profileId: string) => {
    return (messages[profileId]?.length || 0) > 0;
  };

  const existingMatches = profiles.filter((profile) => hasMessages(profile.id));
  const newMatches = profiles.filter((profile) => !hasMessages(profile.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@images/tinder-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={styles.shieldContainer}
            onPress={() => navigation.navigate("Admin")}
          >
            <SHIELD height={24} width={24} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader style={styles.topSection} title="New Matches" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.newMatchesContainer}
        >
          <View>
            <View style={styles.likesCard}>
              <View style={styles.blurCard}>
                {blurredProfile ? (
                  <Image
                    source={{ uri: blurredProfile }}
                    style={styles.blurImg}
                  />
                ) : (
                  <></>
                )}
                <BlurView intensity={20} style={styles.blurView} />
              </View>
              <View style={styles.likeContainer}>
                <Text style={styles.likesCount}>{likesCount}</Text>
              </View>
              <GOLDEN_HEART
                height={45}
                width={45}
                color={colors.gold}
                style={styles.goldenHeart}
              />
            </View>
            <Text style={styles.likesText}>Likes</Text>
          </View>

          {newMatches.map((match) => {
            return (
              <TouchableOpacity
                key={match.id}
                onPress={() => console.log(match)}
              >
                <NewMatchCard
                  photo={match.photo}
                  name={match.name}
                  marker={false}
                  hasCamera={match.hasCamera}
                  matchId={match.id}                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {existingMatches.length > 0 && (
          <>
            <SectionHeader title="Messages" style={styles.bottomSection} />
            <FlatList
              data={existingMatches}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <MessageItem
                  photo={item.photo}
                  name={item.name}
                  message={getLastMessage(item.id)}
                  phoneNumber={item.phoneNumber}
                  hasCamera={item.hasCamera}
                  hasEmoji={item.hasEmoji}
                  showYourTurn={shouldShowYourTurn(item.id)}
                  online={item.online}
                  liked={item.liked}
                  lastMessageFromUser={isLastMessageFromUser(item.id)}
                  onPress={() =>
                    navigation.navigate("Chat", {
                      matchId: item.id,
                      name: item.name,
                      photo: item.photo,
                    })
                  }
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: screenWidth - 104,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E0E0E0",
                    alignSelf: "flex-end",
                  }}
                />
              )}
            />
          </>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        <FLAME height={36} width={36} color={colors.gray} />
        <SEARCH height={36} width={36} color={colors.gray} />
        <View style={styles.starContainer}>
          <STAR height={36} width={36} color={colors.gray} />
          <View style={styles.starBadge}>
            <Text style={styles.starBadgeText}>{likesCount}</Text>
          </View>
        </View>
        <CHAT height={36} width={36} color={colors.gray} />
        <PROFILE height={36} width={36} color={colors.gray} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    zIndex: 1000,
    marginBottom: 16,
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  headerContent: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  logo: {
    height: 60,
    width: 100,
  },
  shield: {
    marginLeft: "auto",
  },
  newMatchesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  likesCard: {
    width: 100,
    height: 125,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 3,
    borderColor: colors.gold_light,
    shadowColor: colors.gold_light,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    zIndex: 1000,
  },
  blurCard: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
  blurImg: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  likeContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gold,
    position: "absolute",
    zIndex: 99999,
  },
  likesCount: {
    fontSize: 14,
    fontFamily: fonts.Proxima_Nova_Bold,
    color: "black",
  },
  likesText: {
    fontSize: 14,
    color: "black",
    alignSelf: "center",
    fontFamily: fonts.Proxima_Nova_Bold,
    paddingTop: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  starContainer: {
    position: "relative",
  },
  starBadge: {
    height: 20,
    width: 20,
    position: "absolute",
    top: -7,
    right: -8,
    backgroundColor: "#FFB800",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  starBadgeText: {
    color: "black",
    fontSize: 10,
    fontFamily: fonts.Proxima_Nova_Bold,
  },
  shieldContainer: {
    paddingRight: 16,
    zIndex: 2,
    marginLeft: "auto",
  },
  topSection: { paddingHorizontal: 16, paddingBottom: 10 },
  bottomSection: { paddingHorizontal: 16, paddingTop: 5 },
  goldenHeart: {
    position: "absolute",
    zIndex: 99999,
    bottom: -22,
  },
});
