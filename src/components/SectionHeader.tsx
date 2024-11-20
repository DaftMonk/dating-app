import { fonts } from "@constants";
import { Text, StyleSheet, StyleProp, ViewStyle, View } from "react-native";

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export function SectionHeader({ title, style }: Props) {
  return (
    <View style={[style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: fonts.Proxima_Nova_Bold,
    color: "#000",
  },
});
