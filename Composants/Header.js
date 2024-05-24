import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ navigation, currentScreen }) {
  return (
    <View style={styles.container}>
      {currentScreen !== 'Accueil' && (
        <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
          <Text style={styles.link}>Accueil</Text>
        </TouchableOpacity>
      )}
      {currentScreen !== 'Anthony' && (
        <TouchableOpacity onPress={() => navigation.navigate('Anthony')}>
          <Text style={styles.link}>Anthony</Text>
        </TouchableOpacity>
      )}
      {currentScreen !== 'Bryen' && (
        <TouchableOpacity onPress={() => navigation.navigate('Bryen')}>
          <Text style={styles.link}>Bryen</Text>
        </TouchableOpacity>
      )}
      {currentScreen !== 'Cedric' && (
        <TouchableOpacity onPress={() => navigation.navigate('Cedric')}>
          <Text style={styles.link}>Cedric</Text>
        </TouchableOpacity>
      )}
      {currentScreen !== 'Thomas' && (
        <TouchableOpacity onPress={() => navigation.navigate('Thomas')}>
          <Text style={styles.link}>Thomas</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'black',
    width: '100%',
  },
  link: {
    fontSize: 20,
    color: 'white',
  },
});