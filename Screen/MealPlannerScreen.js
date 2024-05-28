import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MealPlannerScreen() {
  const [mealPlan, setMealPlan] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'web') {
      checkWebNotificationPermission();
    }
  }, []);

  const checkWebNotificationPermission = async () => {
    console.log("Vérification de la permission de notification web...");
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log("Permission de notification accordée.");
      } else {
        alert('Les notifications ne sont pas activées. Veuillez activer les notifications pour recevoir des alertes.');
        console.log("Les notifications ne sont pas activées et l'utilisateur les a bloquées.");
      }
    } else if (Notification.permission === 'granted') {
      console.log("Les notifications sont déjà activées.");
    } else {
      alert('Les notifications ne sont pas activées et ont été bloquées. Veuillez activer les notifications dans les paramètres de votre navigateur.');
      console.log("Les notifications ne sont pas activées et l'utilisateur les a bloquées.");
    }
  };

  const addToMealPlan = (day, recipe) => {
    setMealPlan([...mealPlan, { day, recipe }]);
    scheduleMealNotification(day, recipe.title);
  };

  const scheduleMealNotification = async (day, recipeTitle) => {
    if (Platform.OS === 'web') {
      if (Notification.permission === 'granted') {
        new Notification(`Rappel du Plan de Repas`, {
          body: `N'oubliez pas de préparer ${recipeTitle} le ${day}!`,
        });
      } else {
        console.log("Notification non programmée : permissions non accordées.");
      }
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Rappel du Plan de Repas`,
          body: `N'oubliez pas de préparer ${recipeTitle} le ${day}!`,
        },
        trigger: { seconds: 15 },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planificateur de Repas</Text>
      <FlatList
        data={mealPlan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.day}: {item.recipe.title}</Text>
        )}
      />
      <Button title="Ajouter au Plan de Repas" onPress={() => addToMealPlan('Lundi', { title: 'Spaghetti Carbonara', ingredients: [{ name: 'Spaghetti', quantity: 1 }, { name: 'Carbonara Sauce', quantity: 1 }] })} />
      <Button title="Voir la Liste de Courses" onPress={() => navigation.navigate('ShoppingList', { mealPlan })} />
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
