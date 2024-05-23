import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import ImageEditor from '@react-native-community/image-editor';

const PageCamera = () => {
  /* const [photo, setPhoto] = useState(null);
  const [contrastedPhoto, setContrastedPhoto] = useState(null);

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setPhoto(response.assets[0].uri);
        setContrastedPhoto(null); // Reset contrasted photo when a new photo is taken
      }
    });
  };

  const adjustContrast = (increase = true) => {
    if (photo) {
      const contrastFactor = increase ? 1.2 : 0.8; // Increase or decrease contrast
      ImageEditor.adjust({
        uri: photo,
        contrast: contrastFactor,
      }).then((uri) => {
        setContrastedPhoto(uri);
      }).catch((error) => {
        console.log('ImageEditor Error: ', error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
      {photo && (
        <>
          <Image source={{ uri: photo }} style={styles.image} />
          <Button title="Increase Contrast" onPress={() => adjustContrast(true)} />
          <Button title="Decrease Contrast" onPress={() => adjustContrast(false)} />
        </>
      )}
      {contrastedPhoto && <Image source={{ uri: contrastedPhoto }} style={styles.image} />}
    </View>
  );*/
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    margin: 10,
  }, 
});

export default PageCamera;
