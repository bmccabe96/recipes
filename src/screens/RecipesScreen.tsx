import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImagePickerExample from '../components/ImagePicker';

import { useRecipes } from '../context/Recipes';
import { useAuth } from '../context/Auth';

import { RecipesProps } from '../types';

const RecipesScreen = ({ route, navigation }: RecipesProps) => {
  const {
    state: { recipes },
    recipesLoad,
  } = useRecipes();
  const {
    state: { user },
  } = useAuth();

  useEffect(() => {
    recipesLoad();
  }, []);

  console.log(user);

  return (
    <>
      <View style={styles.container}>
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
        <ImagePickerExample />
        <StatusBar style="auto" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecipesScreen;
