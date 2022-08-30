import React from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { RecipeDetailProps } from '../types';

const RecipeDetailScreen = ({
  route,
  navigation,
}: RecipeDetailProps) => {
  console.log(route, navigation);
  return (
    <>
      <View>
        <Text>Recipe Detail Screen</Text>
        <Button
          title="Go to recipes"
          onPress={() => navigation.navigate('Recipes')}
        />
      </View>
    </>
  );
};

export default RecipeDetailScreen;
