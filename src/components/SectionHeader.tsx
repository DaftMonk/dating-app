import { Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
};

export function SectionHeader({ title }: Props) {
  return (
    <Text style={styles.title}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#000',
  },
});