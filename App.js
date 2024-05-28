import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageAccueil from './Pages/PageAccueil';
import PageAnthony from './Pages/PageAnthony';
import PageBryen from './Pages/PageBryen';
import PageCedric from './Pages/PageCedric';
import HomeScreen from './Screen/HomeScreen';
import RecipeScreen from './Screen/RecipeScreen';
import MealPlannerScreen from './Screen/MealPlannerScreen';
import FavoritesScreen from './Screen/FavoritesScreen';
import ShoppingListScreen from './Screen/ShoppingListScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageAccueil">
        <Stack.Screen name="Accueil" component={PageAccueil} />
        <Stack.Screen name="Anthony" component={PageAnthony} />
        <Stack.Screen name="Bryen" component={PageBryen} />
        <Stack.Screen name="Cedric" component={PageCedric} />

        {/* /* Thomas Begin */}
        <Stack.Screen name="Thomas" component={HomeScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
        <Stack.Screen name="MealPlanner" component={MealPlannerScreen} options={{ title: 'Meal Planner' }} />
        <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
        {/* Thomas End  */}

      </Stack.Navigator>
    </NavigationContainer>
  ); 
}