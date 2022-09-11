import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
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
  const [url, setUrl] = useState<string>('');

  const recipe = recipes.find(
    ({ name }: any) =>
      name === route.params.name && user === route.params.user
  );

  useEffect(() => {
    setUrl(recipe.downloadUrl);
  }, []);

  return (
    <>
      <View>
        <Text>{recipe.name}</Text>
        <Text>{recipe.category}</Text>
        <Text>{recipe.downloadUrl}</Text>
        {url && (
          <Image
            source={{ uri: url }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    </>
  );
};

export default RecipeDetailScreen;
