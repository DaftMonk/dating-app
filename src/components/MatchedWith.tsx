import { fonts } from "@constants";
import { blue_dark, gray_dark, gray_darker } from "@constants/color";
import SENT from "@svgs/sent.svg";
import { formatMatchDate } from "../utils/dateUtils";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  profileImage?: string;
  name: string;
  matchDate: Date;
  enableMessages: () => void;
};

export function MatchedWith({ profileImage, name, matchDate, enableMessages }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You matched with <Text style={styles.highlight}>{name}</Text>
      </Text>
      <Text style={styles.subtitle}>{formatMatchDate(matchDate)}</Text>
      <Image source={{ uri: profileImage }} style={styles.image} />
      <Text style={styles.infoText}>
        Know when <Text style={styles.highlight}>{name}</Text> has read your
        message.
      </Text>
      <TouchableOpacity style={styles.button} onPress={enableMessages}>
        <View style={styles.iconTextContainer}>
          <SENT height={30} width={30} style={styles.icon} />
          <Text style={styles.buttonText}>Get Read Receipts</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: fonts.Proxima_Nova_Regular,
    marginBottom: 5,
    textAlign: "center",
    color: gray_dark,
  },
  highlight: {
    fontWeight: "700",
    fontFamily: fonts.Proxima_Nova_Bold,
    color: gray_darker,
  },
  subtitle: {
    fontSize: 14,
    color: gray_dark,
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: fonts.Proxima_Nova_Regular,
    color: gray_dark,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1786FF",
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4.8 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 0,
  },
  buttonText: {
    color: "#fff",
    fontFamily: fonts.Proxima_Nova_Bold,
    fontSize: 12,
    fontWeight: "600",
  },
});