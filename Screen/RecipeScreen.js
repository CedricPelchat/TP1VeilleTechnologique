import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';

export default function RecipeScreen({ route }) {
  const { recipe } = route.params;
  const [currentStep, setCurrentStep] = useState(0);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const text = e.value[0].toLowerCase();
    if (text.includes('stop')) {
      stopReading();
    } else if (text.includes('continuer') || text.includes('continue')) {
      continueReading();
    }
  };

  const onSpeechError = (e) => {
    console.error(e);
  };

  const startListening = async () => {
    try {
      await Voice.start('fr-FR');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const readStep = () => {
    if (currentStep < recipe.steps.length) {
      Speech.speak(recipe.steps[currentStep], { onDone: handleSpeechDone });
      setCurrentStep(currentStep + 1);
    } else {
      Speech.speak("Vous avez terminé la recette !");
      setIsReading(false);
      stopListening();
    }
  };

  const handleSpeechDone = () => {
    if (isReading) {
      readStep();
    }
  };

  const startReading = () => {
    setIsReading(true);
    readStep();
    startListening();
  };

  const stopReading = () => {
    setIsReading(false);
    Speech.stop();
    stopListening();
  };

  const continueReading = () => {
    if (!isReading) {
      setIsReading(true);
      readStep();
      startListening();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <ScrollView style={styles.scrollContainer}>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={styles.step}>
            {index + 1}. {step}
          </Text>
        ))}
      </ScrollView>
      <Button title="Commencer la Cuisine" onPress={startReading} />
      <Button title="Stop" onPress={stopReading} />
      <Button title="Continuer" onPress={continueReading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  step: {
    fontSize: 18,
    marginVertical: 10,
  },
});
