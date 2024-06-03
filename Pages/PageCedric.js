import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import Header from '../Composants/Header';




const PageCedric = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let newPhoto = await cameraRef.takePictureAsync();
      setPhoto(newPhoto.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Cedric" />
      {hasPermission === null ? <View /> : hasPermission === false ? <Text>No access to camera</Text> : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={ref => setCameraRef(ref)}>
            <View style={styles.buttonContainer}>
              <Button
                title="Take Photo"
                onPress={takePicture}
              />
            </View>
          </Camera>
          {photo && <Image source={{ uri: photo }} style={styles.preview} />}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
  preview: {
    flex: 0.4,
    width: '100%',
    resizeMode: 'contain',
  },
});
export default PageCedric;