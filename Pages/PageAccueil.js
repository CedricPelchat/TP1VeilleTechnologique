import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Header from '../Composants/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PageAccueil({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Images/fondEcranAccueil.jpg')} style={styles.backgroundImage}>
        <Header navigation={navigation} currentScreen="Accueil" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Notre AWESOME App !</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
