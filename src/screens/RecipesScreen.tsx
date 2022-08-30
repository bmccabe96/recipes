import React from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { RecipesProps } from '../types';

const RecipesScreen = ({ route, navigation }: RecipesProps) => {
  console.log(route, navigation);
  return (
    <>
      <View>
        <Text>Recipes Screen</Text>
        <Button
          title="Go to details"
          onPress={() => navigation.navigate('RecipeDetail')}
        />
      </View>
    </>
  );
};

export default RecipesScreen;
