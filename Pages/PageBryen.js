import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Header from '../Composants/Header';

export default function PageBryen({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const [position, setPosition] = useState({ x: (width - 100) / 2, y: (height - 100) / 2 });

  const headerHeight = 50;
  const footerHeight = 50;
  const squareSize = 50;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      const newX = position.x + dx;
      const newY = position.y + dy;

      const maxX = width - squareSize;
      const maxY = height - squareSize - footerHeight;
      const minY = headerHeight;

      if (newX >= 0 && newY >= minY && newX <= maxX && newY <= maxY) {
        setPosition({ x: newX, y: newY });
      }
    },
    onPanResponderRelease: () => {}
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Bryen" />
      <View
        style={[styles.square, { width: squareSize, height: squareSize, left: position.x, top: position.y }]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  square: {
    backgroundColor: 'black',
    position: 'absolute',
  },
});
