import React from 'react';
import { View, Text } from 'react-native';
import { RecipeDetailProps } from '../types';
import { firestore } from '../config/firebase';

import { collection, getDocs } from 'firebase/firestore';

import { useRecipes } from '../context/Recipes';
import { useAuth } from '../context/Auth';

const RecipeDetailScreen = ({
  route,
  navigation,
}: RecipeDetailProps) => {
  const {
    state: { recipes },
  } = useRecipes();
  const {
    state: { user },
  } = useAuth();

  const recipe = recipes.find(
    ({ name }: any) =>
      name === route.params.name && user === route.params.user
  );

  return (
    <>
      <View>
        <Text>{recipe.name}</Text>
        <Text>{recipe.category}</Text>
        <Text>{recipe.downloadUrl}</Text>
      </View>
    </>
  );
};

export default RecipeDetailScreen;
