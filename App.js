import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  // Function to start the animation
  const startAnimation = () => {
    // First reset the animated values
    opacity.setValue(0);
    scale.setValue(0.5);

    // Start the parallel animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startAnimation}>
        <Animated.View style={[styles.box, { opacity, transform: [{ scale }] }]}>
          <Text style={styles.text}>Tap me!</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
  },
});

export default App;

//test Bryen