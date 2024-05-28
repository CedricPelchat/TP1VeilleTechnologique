import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, PanResponder, Text, Animated } from 'react-native';
import Header from '../Composants/Header';

export default function PageBryen({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const [position, setPosition] = useState({ x: (width - 50) / 2, y: (height - 50) / 2 });
  const [greenSquares, setGreenSquares] = useState([]);
  const [speed, setSpeed] = useState(3000);
  const [squareSize, setSquareSize] = useState(50);
  const [fallTiming, setFallTiming] = useState(2000);

  const positionRef = useRef(position);

  const headerHeight = 50;
  const footerHeight = 50;
  const greenSquareSize = 50;

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
        positionRef.current = { x: newX, y: newY };
      }
    },
    onPanResponderRelease: () => {}
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const startX = Math.random() * (width - greenSquareSize);
      const newSquare = {
        id: Math.random().toString(),
        x: startX,
        y: new Animated.Value(0),
        reachedBottom: false
      };
      setGreenSquares(squares => [...squares, newSquare]);

      Animated.timing(newSquare.y, {
        toValue: height,
        duration: speed,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && !newSquare.reachedBottom) {
          handleMissedSquare();
          setGreenSquares(squares => squares.filter(square => square.id !== newSquare.id));
        }
      });
    }, fallTiming);

    return () => clearInterval(interval);
  }, [speed, fallTiming]);

  const handleMissedSquare = () => {
    setSquareSize(size => Math.max(size - 10, 30));
    setSpeed(speed => Math.max(speed - 200, 1000));
    setFallTiming(timing => Math.max(timing - 200, 500));
  };

  const checkCollision = (greenX, greenY) => {
    const blackX = positionRef.current.x;
    const blackY = positionRef.current.y;
    return (
      greenX < blackX + squareSize &&
      greenX + greenSquareSize > blackX &&
      greenY < blackY + squareSize &&
      greenY + greenSquareSize > blackY
    );
  };

  useEffect(() => {
    const checkCollisions = () => {
      setGreenSquares(squares =>
        squares.map(square => {
          const greenX = square.x;
          const greenY = square.y.__getValue();
          if (checkCollision(greenX, greenY)) {
            setSquareSize(size => size + 5);
            setSpeed(speed => Math.max(speed - 200, 1000));
            setFallTiming(timing => Math.max(timing - 200, 500));
            return { ...square, reachedBottom: true };
          }
          return square;
        }).filter(square => !square.reachedBottom)
      );
      requestAnimationFrame(checkCollisions);
    };

    const animationId = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} currentScreen="Bryen" />
      <View
        style={[styles.square, { width: squareSize, height: squareSize, left: position.x, top: position.y }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.squareText}>{squareSize}</Text>
      </View>
      {greenSquares.map(square => (
        <Animated.View
          key={square.id}
          style={[styles.greenSquare, { width: greenSquareSize, height: greenSquareSize, left: square.x, top: square.y }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  square: {
    backgroundColor: 'black',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    color: 'white',
    fontSize: 20,
  },
  greenSquare: {
    backgroundColor: 'green',
    position: 'absolute',
  },
});
