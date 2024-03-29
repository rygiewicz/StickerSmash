import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import colors from './config/colors';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from 'react';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const placeholder = require('./assets/images/background-image.png');

export default function App() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [appOptionsVisible, setAppOptionsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const imageRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

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

  async function onSaveImagePress() {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  }

  function onPickerClose() {
    setPickerVisible(false);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholder={placeholder} uri={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
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
      <EmojiPicker isVisible={pickerVisible} onClose={onPickerClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onPickerClose} />
      </EmojiPicker>
      <StatusBar style={colors.statusBar} />
    </GestureHandlerRootView>
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
