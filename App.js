import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageAccueil from './Pages/PageAccueil';
import PageAnthony from './Pages/PageAnthony';
import PageBryen from './Pages/PageBryen';
import PageCedric from './Pages/PageCedric';
import PageThomas from './Pages/PageThomas';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageAccueil">
        <Stack.Screen name="Accueil" component={PageAccueil} />
        <Stack.Screen name="Anthony" component={PageAnthony} />
        <Stack.Screen name="Bryen" component={PageBryen} />
        <Stack.Screen name="Cedric" component={PageCedric} />
        <Stack.Screen name="Thomas" component={PageThomas} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}