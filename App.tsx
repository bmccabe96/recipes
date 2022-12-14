import React, { useEffect, useState } from 'react';
import './src/config/firebase';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogging } from './src/hooks/useLogging';
import { RecipesProvider } from './src/context/Recipes';
import { AuthProvider } from './src/context/Auth';
import RootNavigation from './src/navigation';

import {
  RecipesScreen,
  RecipeDetailScreen,
  ShoppingScreen,
  AccountScreen,
} from './src/screens';

// import { RootStackParamList } from './src/types';

// const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [logging] = useLogging('Application');

  useEffect(() => {
    logging.info('Loading application');
  }, [logging]);

  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
