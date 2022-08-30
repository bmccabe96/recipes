import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RecipesProvider } from './src/context/Recipes';

import { useLogging } from './src/hooks/useLogging';

import {
  RecipesScreen,
  RecipeDetailScreen,
  ShoppingScreen,
  AccountScreen,
} from './src/screens';

import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [logging] = useLogging('Application');

  useEffect(() => {
    logging.info('Loading application');
  }, [logging]);

  // return <RecipesApp ref={(navigator) => setNavigator(navigator)} />;
  return (
    <RecipesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Recipes">
          <Stack.Screen name="Recipes" component={RecipesScreen} />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{ title: 'Recipe Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipesProvider>
  );
}
