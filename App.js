import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import colors from './config/colors';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import EmojiPicker from './components/EmojiPicker';

const placeholder = require('./assets/images/background-image.png');

export default function App() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [appOptionsVisible, setAppOptionsVisible] = useState(false);
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
    setAppOptionsVisible(true);
  }

  function onResetPress() {
    setAppOptionsVisible(false);
  }

  function onAddStickerPress() {
    setPickerVisible(true);
  }

  function onSaveImagePress() {
    // we will implement this later
  }

  function onPickerClose() {
    setPickerVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholder={placeholder} uri={selectedImage} />
      </View>
      {appOptionsVisible ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onResetPress} />
            <CircleButton onPress={onAddStickerPress} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImagePress} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={onChoosePhotoPress} />
          <Button label="Use this photo" onPress={onUsePhotoPress} />
        </View>
      )}
      <EmojiPicker isVisible={pickerVisible} onClose={onPickerClose}></EmojiPicker>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
