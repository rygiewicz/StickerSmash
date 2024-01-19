import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import colors from './config/colors';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';

const placeholder = require('./assets/images/background-image.png');

export default function App() {
  async function onChoosePhotoPress() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    console.log(result);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholder={placeholder} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={onChoosePhotoPress} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style={colors.statusBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
