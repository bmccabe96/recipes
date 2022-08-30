import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

import { useRecipes } from '../context/Recipes';

import { RecipesProps } from '../types';

const RecipesScreen = ({ route, navigation }: RecipesProps) => {
  const {
    state: { recipes },
    recipesLoad,
  } = useRecipes();

  useEffect(() => {
    recipesLoad();
  }, []);

  return (
    <>
      <View>
        <Text>Recipes Screen</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RecipeDetail', {
                  name: item.name,
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default RecipesScreen;
