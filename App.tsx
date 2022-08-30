import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useLogging } from './src/hooks/useLogging';

import {
  RecipesScreen,
  RecipeDetailScreen,
  ShoppingScreen,
  AccountScreen,
} from './src/screens';

import testData from './src/recipes.json';

import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [data, setData] = useState<Object[]>([]);
  const [logging] = useLogging('Application');

  useEffect(() => {
    //setData([testData]);
  });

  useEffect(() => {
    logging.info('Loading application');
  }, [logging]);

  // return <RecipesApp ref={(navigator) => setNavigator(navigator)} />;
  return (
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
  );
}
