import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  Platform } from 'react-native';
import Header from '../Composants/Header';
import * as Haptics from 'expo-haptics';
import Draggable from 'react-draggable';
// Check if running on web to import lottie-web
let LottieView;
if (Platform.OS === 'web') {
  // On web, use lottie-web
  LottieView = require('lottie-web').default;
} else {
  // On React Native, use lottie-react-native
  LottieView = require('lottie-react-native').default;
}

export default function PageCedric({ navigation }) {
  const [positions, setPositions] = useState({
    animation1: { x: 0, y: 0 },
    animation2: { x: 0, y: 0 },
    animation3: { x: 0, y: 0 },
  });

  const handleDragStop = (animationType, e, data) => {
    setPositions({
      ...positions,
      [animationType]: { x: 0, y: 0 }, // Reset position to initial
    });
  };


  const handleAnimationPress = (animationType) => {
    switch(animationType) {
      case 'animation1':
        Haptics.notificationAsync('error', { enableVibrateFallback: true });
        break;
      case 'animation2':
        Haptics.notificationAsync('warning', { enableVibrateFallback: true });
        break;
      case 'animation3':
        Haptics.notificationAsync('success', { enableVibrateFallback: true });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Cedric" />
      <Text style={styles.title}>Cedric</Text>
      <TouchableOpacity onPress={() => handleAnimationPress('animation1')}>
        <LottieView
          source={require('../assets/Animation1.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnimationPress('animation2')}>
        <LottieView
          source={require('../assets/Animation2.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnimationPress('animation3')}>
        <LottieView
          source={require('../assets/Animation3.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
