import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholder, uri }) {
  const source = uri ? { uri } : placeholder;

  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
