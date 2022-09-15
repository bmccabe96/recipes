import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { RecipeDetailProps } from '../types';
import { firestore } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRecipes } from '../context/Recipes';
import { useAuth } from '../context/Auth';
import MainDetail from '../components/MainDetail';
import ListDetails from '../components/ListDetails';

const width = Dimensions.get('window').width;

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
    ({ name }: any) => name === route.params.name
  );

  useEffect(() => {
    setUrl(recipe.downloadUrl);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {url && (
            <Image
              source={{ uri: url }}
              style={{ width: width, height: width }}
            />
          )}
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.category}>{recipe.category}</Text>
        </View>
        <View style={styles.details}>
          <MainDetail
            fieldName="Servings"
            fieldValue={recipe.servingSize}
          />
          <MainDetail
            fieldName="Prep time"
            fieldValue={recipe.prepTime}
          />
          <MainDetail
            fieldName="Cook time"
            fieldValue={recipe.cookTime}
          />
          <ListDetails
            title="Ingredients"
            data={recipe.ingredients}
          />
          <ListDetails title="Directions" data={recipe.directions} />
          <ListDetails title="Nutrition" data={recipe.nutrition} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f9fa',
  },
  imageContainer: {},
  name: {
    position: 'absolute',
    bottom: 30,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  category: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  details: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  detailItem: {},
});

export default RecipeDetailScreen;
