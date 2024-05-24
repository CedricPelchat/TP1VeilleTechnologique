import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Composants/Header';

export default function PageBryen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Bryen" />
      <Text style={styles.title}>Bryen</Text>
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
