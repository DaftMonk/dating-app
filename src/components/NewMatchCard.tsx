import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  photo: string;
  name: string;
};

export function NewMatchCard({ photo, name }: Props) {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
        <Image source={{ uri: photo }} style={styles.photo} />
        <Text style={styles.name}>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 130,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});