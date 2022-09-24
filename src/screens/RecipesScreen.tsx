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
  //TO DO
  // WRITE FUNCTION TO FILTER RECIPES AND PASS TO THE RECIPESFILTER COMPONENT
  const filterRecipes = (category: string) => {
    category === 'all'
      ? setFilterValue(null)
      : setFilterValue(category);
    hideModal();
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            !filterValue
              ? recipes
              : recipes.filter(
                  (item: any) => item.category === filterValue
                )
          }
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
    marginTop: 5,
    marginBottom: 15,
  },
});

export default RecipesScreen;
