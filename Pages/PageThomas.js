import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Composants/Header';

export default function PageThomas({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Header navigation={navigation} currentScreen="Thomas" /> */}
      {/* <Text style={styles.title}>Thomas</Text> */}
    </View>
  );
}
/* "@react-google-maps/api": "^2.19.3", */

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