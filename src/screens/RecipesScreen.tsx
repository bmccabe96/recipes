import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageItem from '../components/ImageItem';
import RecipesFilter from '../components/RecipesFilter';
import EmptyScreen from '../components/EmptyScreen';
import { useRecipes } from '../context/Recipes';
import { useAuth } from '../context/Auth';
import { useRecipeFilter } from '../context/RecipeFilter';
import { RecipesProps } from '../types';

const RecipesScreen = ({ route, navigation }: RecipesProps) => {
  const {
    state: { recipes },
    recipesLoad,
  } = useRecipes();
  const {
    state: { user },
  } = useAuth();
  const {
    state: { modalVisible },
    hideModal,
  } = useRecipeFilter();

  useEffect(() => {
    recipesLoad(user);
  }, []);

  const [filterValue, setFilterValue] = useState<string | null>(null);
  const filterRecipes = (category: string) => {
    category === 'all'
      ? setFilterValue(null)
      : setFilterValue(category);
    hideModal();
  };

  if (recipes.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyScreen />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* <Button
          title="print state"
          onPress={() => {
            recipes.forEach((item: any) =>
              console.log(item.name, item.id)
            );
            recipesLoad(user);
          }}
        /> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            !filterValue
              ? recipes
              : recipes.filter(
                  (item: any) => item.category === filterValue
                )
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RecipeDetail', {
                  name: item.name,
                  user: user,
                  recipe: recipes.find(
                    ({ id }: any) => id === item.id
                  ),
                });
              }}
              style={[styles.listItem, styles.shadowProp]}
              activeOpacity={1}
            >
              <Text style={styles.title}>{item.name}</Text>
              {item.downloadUrl && (
                <View style={styles.image}>
                  <ImageItem
                    image={item.downloadUrl}
                    style={styles.image}
                  />
                </View>
              )}
              {item.category && <Text>- {item.category} -</Text>}
            </TouchableOpacity>
          )}
        />
        <StatusBar style="auto" />
        {modalVisible && (
          <RecipesFilter
            categories={[
              ...new Set(recipes.map((item: any) => item.category)),
            ]}
            filterRecipes={filterRecipes}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    width: 320,
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 28,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default RecipesScreen;
