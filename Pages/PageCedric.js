import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Composants/Header';

export default function PageCedric({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Cedric" />
      <Text style={styles.title}>Cedric</Text>
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
});