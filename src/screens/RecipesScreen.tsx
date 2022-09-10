import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useRecipes } from '../context/Recipes';
import { useAuth } from '../context/Auth';

import { RecipesProps } from '../types';

import { storage } from '../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

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
  }, [recipes]);

  return (
    <>
      <View style={styles.container}>
        <Text>Recipes Screen</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RecipeDetail', {
                  name: item.name,
                  user: user,
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
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
