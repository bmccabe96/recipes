import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RecipesProvider } from '../context/Recipes';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  RecipesScreen,
  RecipeDetailScreen,
  AccountScreen,
} from '../screens';

import { RootStackParamList } from '../../src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const RecipeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Recipes">
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <RecipesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = '';
              color = 'blue';

              if (route.name === 'Food') {
                iconName = focused
                  ? 'fast-food'
                  : 'fast-food-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              // You can return any component that you like here!
              return (
                <Ionicons name={iconName} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Food"
            component={RecipeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </RecipesProvider>
  );
};

export default UserStack;
