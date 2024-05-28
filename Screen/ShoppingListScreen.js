import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ShoppingListScreen({ route }) {
  const { mealPlan } = route.params;
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    generateShoppingList();
  }, [mealPlan]);

  const generateShoppingList = () => {
    const list = mealPlan.reduce((acc, meal) => {
      meal.recipe.ingredients.forEach(ingredient => {
        const existingItem = acc.find(item => item.name === ingredient.name);
        if (existingItem) {
          existingItem.quantity += ingredient.quantity;
        } else {
          acc.push({ ...ingredient });
        }
      });
      return acc;
    }, []);
    setShoppingList(list);
  };

  const shareShoppingList = async () => {
    const content = shoppingList.map(item => `${item.quantity} x ${item.name}`).join('\n');
    
    if (Platform.OS === 'web') {
      // Méthode pour le web
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ListeCourse.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Méthode pour les autres plateformes
      const fileUri = FileSystem.documentDirectory + 'ListeCourse.txt';
      await FileSystem.writeAsStringAsync(fileUri, content);
      await Sharing.shareAsync(fileUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste de Courses</Text>
      <FlatList
        data={shoppingList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.quantity} x {item.name}</Text>
        )}
      />
      <Button title="Partager la liste" onPress={shareShoppingList} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
