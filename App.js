import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import colors from './config/colors';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const placeholder = require('./assets/images/background-image.png');

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  async function onChoosePhotoPress() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setSelectedImage(result.assets[0].uri);
  }

  function onUsePhotoPress() {
    setShowAppOptions(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholder={placeholder} uri={selectedImage} />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={onChoosePhotoPress} />
          <Button label="Use this photo" onPress={onUsePhotoPress} />
        </View>
      )}
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
