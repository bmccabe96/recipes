import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RecipesScreen, RecipeDetailScreen } from '../screens';

import { RootStackParamList } from '../../src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const UserStack = () => {
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
};

export default UserStack;
