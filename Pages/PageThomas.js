
import React, { useState } from 'react';
import { Button, View, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';

const TRANSLATION_API_KEY = 'AIzaSyAyaEWnU_42tvp925N77UQ9MjRjKCYXQs4';

export default function PageThomas({navigation}) {
  const [inputText, setInputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const detectLanguage = async (text) => {
    try {
      const detectionResponse = await fetch(`https://translation.googleapis.com/language/translate/v2/detect?key=${TRANSLATION_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text
        })
      });

      const detectionData = await detectionResponse.json();
      const languageCode = detectionData.data.detections[0][0].language;
      const languageName = await fetchLanguageName(languageCode);
      setDetectedLanguage(languageName);
    } catch (error) {
      console.error('Error during language detection:', error);
      alert(`Il y a eu une erreur lors de la détection de la langue : ${error.message}`);
    }
  };

  const fetchLanguageName = async (languageCode) => {
    try {
      const languagesResponse = await fetch(`https://translation.googleapis.com/language/translate/v2/languages?key=${TRANSLATION_API_KEY}&target=fr`, {
        method: 'GET'
      });
      const languagesData = await languagesResponse.json();
      const language = languagesData.data.languages.find(lang => lang.language === languageCode);
      return language ? language.name : languageCode;
    } catch (error) {
      console.error('Error fetching language name:', error);
      return languageCode;
    }
  };

  const translateText = async () => {
    try {
      const translationResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: inputText,
          target: 'fr'
        })
      });

      const translationData = await translationResponse.json();
      const translatedText = translationData.data.translations[0].translatedText;
      setTranslatedText(translatedText);

      // Utilisez la synthèse vocale pour lire la traduction
      Speech.speak(translatedText, { language: 'fr' });
    } catch (error) {
      console.error('Error during translation:', error);
      alert(`Il y a eu une erreur lors de la traduction : ${error.message}`);
    }
  };

  const handleTextChange = (text) => {
    setInputText(text);
    setDetectedLanguage('');
    setTranslatedText('');
    if (text) {
      detectLanguage(text);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Entrez du texte à traduire :</Text>
      <TextInput
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          padding: 10
        }}
        multiline
        placeholder="Entrez du texte ici"
        value={inputText}
        onChangeText={handleTextChange}
      />
      <Text>Langue détectée : {detectedLanguage}</Text>
      <Button title="Traduire en français" onPress={translateText} />
      <Text style={{ marginTop: 20 }}>Texte traduit :</Text>
      <TextInput
        style={{
          height: 100,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 10,
          padding: 10
        }}
        multiline
        editable={false}
        value={translatedText}
      />
    </View>
  );
}