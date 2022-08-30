import React from 'react';
import { View, Text } from 'react-native';
import { RecipeDetailProps } from '../types';

import { useRecipes } from '../context/Recipes';

const RecipeDetailScreen = ({
  route,
  navigation,
}: RecipeDetailProps) => {
  const {
    state: { recipes },
  } = useRecipes();
  const recipeName: String = route.params.name;
  const recipe = recipes.find(({ name }: any) => name === recipeName);

  return (
    <>
      <View>
        <Text>Recipe Detail Screen</Text>
        <Text>{recipe.category}</Text>
        <Text>{recipe['serving-size']}</Text>
        <Text>{recipe.directions[0]}</Text>
        <Text>{recipe.nutrition[0]}</Text>
      </View>
    </>
  );
};

export default RecipeDetailScreen;
