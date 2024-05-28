import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image, TouchableOpacity,Platform} from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const recipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: 'https://via.placeholder.com/150',
    steps: [
      'Faire bouillir de l\'eau salée.',
      'Ajouter les spaghetti.',
      'Cuire jusqu\'à ce qu\'ils soient al dente.',
      'Égoutter les spaghetti.',
      'Mélanger avec la sauce carbonara.'
    ]
  },
  {
    id: '2',
    title: 'Chicken Parmesan',
    image: 'https://via.placeholder.com/150',
    steps: [
      'Faire bouillir de l\'eau salée.\n Ajouter les spaghetti.',
      'Cuire jusqu\'à ce qu\'ils soient al dente.',
      'Égoutter les spaghetti.',
      'Mélanger avec la sauce carbonara.'
    ],
  },
  {
    id: '3',
    title: 'Beef Tacos',
    image: 'https://via.placeholder.com/150',
    steps: [
      'Faire bouillir de l\'eau salée.',
      'Ajouter les spaghetti.',
      'Cuire jusqu\'à ce qu\'ils soient al dente.',
      'Égoutter les spaghetti.',
      'Mélanger avec la sauce carbonara.'
    ]
  }
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [favorites, setFavorites] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const text = e.value[0];
    setSearchQuery(text);
    filterRecipes(text);
    setIsListening(false);
  };

  const handleVoiceSearch = () => {
    Speech.speak('Say the name of the recipe you are looking for', {
      onDone: () => {
        startListening();
      },
    });
  };

  const startListening = () => {
    setIsListening(true);
    Voice.start('en-US').catch((e) => console.error(e));
  };

  const stopListening = () => {
    setIsListening(false);
    Voice.stop().catch((e) => console.error(e));
  };

  const filterRecipes = (query) => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);

    if (filtered.length === 0) {
      searchOnline(query);
    }
  };

  const searchOnline = (query) => {
    Alert.alert(
      'Recette non trouvée',
      `Aucune recette locale trouvée pour "${query}". Voulez-vous chercher en ligne ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Chercher en ligne',
          onPress: () => {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+recette`;
            WebBrowser.openBrowserAsync(searchUrl);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    filterRecipes(text);
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    } else {
      Alert.alert('Favori déjà ajouté', 'Cette recette est déjà dans vos favoris.');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Voir les favoris"
        onPress={() => navigation.navigate('Favorites', { favorites })}
      />
      <Button title="Recherche vocale" onPress={handleVoiceSearch} disabled={isListening} />
      <Button
        title="Planifier les repas"
        onPress={() => navigation.navigate('MealPlanner')}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher des recettes..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => addToFavorites(item)}>
              <Ionicons name="star" size={24} color="gold" />
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.navigate('Recipe', { recipe: item })}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
