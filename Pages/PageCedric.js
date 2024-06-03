import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import Header from '../Composants/Header';

const PageCedric = ({ navigation }) => {
  const [googleUrl, setGoogleUrl] = useState('https://flappybird.io');

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Cedric" />
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: googleUrl }}
          style={styles.webView}
        />
      </View>
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
  webViewContainer: {
    flex: 1,
    width: '100%',
  },
  webView: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
});

export default PageCedric;
