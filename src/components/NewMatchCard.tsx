import { colors, fonts } from "@constants";
import CAMERA_BLUE from "@svgs/camera_blue.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  photo: string;
  name: string;
  marker?: boolean;
  hasCamera?: boolean;
};

export function NewMatchCard({ photo, name, marker, hasCamera }: Props) {
  return (
    <TouchableOpacity style={styles.container}>
      {marker && <View style={styles.marker} />}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      >
        <Image source={{ uri: photo }} style={styles.photo} />
      </LinearGradient>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        {hasCamera && (
          <CAMERA_BLUE height={25} width={25} style={styles.camera} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  gradient: {
    width: 100,
    height: 125,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 8,
  },
  name: {
    color: "black",
    fontSize: 14,
    fontFamily: fonts.Proxima_Nova_Bold,
  },
  camera: {
    marginLeft: 5,
  },
  marker: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: colors.primary,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    right: -10,
    marginTop: "52%",
  },
});
