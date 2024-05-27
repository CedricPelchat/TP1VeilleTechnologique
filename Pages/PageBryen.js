import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Header from '../Composants/Header';

export default function PageBryen({ navigation }) {
  const { width, height } = Dimensions.get('window');

  const [squarePosition, setSquarePosition] = useState({
    x: (width - 100) / 2,
    y: (height - 100) / 2,
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      setSquarePosition({
        x: gestureState.moveX - 50,
        y: gestureState.moveY - 50,
      });
    },
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Bryen" />
      <View
        {...panResponder.panHandlers}
        style={[
          styles.centeredSquare,
          { top: squarePosition.y, left: squarePosition.x },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    position: 'absolute',
  },
});
