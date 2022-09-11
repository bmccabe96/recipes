import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
  }, [recipes]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
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
              style={styles.listItem}
              activeOpacity={1}
            >
              <Text style={styles.title}>{item.name}</Text>
              {item.downloadUrl && (
                <Image
                  source={{ uri: item.downloadUrl }}
                  style={styles.image}
                />
              )}
              {item.category && <Text>- {item.category} -</Text>}
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
  listItem: {
    alignItems: 'center',
    borderBottomColor: 'rgb(0,0,200)',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 100,
    marginVertical: 10,
  },
});

export default RecipesScreen;
