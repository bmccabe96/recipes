import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { RecipeDetailProps } from '../types';
import { useRecipes } from '../context/Recipes';
import { useAuth } from '../context/Auth';
import MainDetail from '../components/MainDetail';
import ListDetails from '../components/ListDetails';
import ImageItem from '../components/ImageItem';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecipeDetailScreen = ({ route }: RecipeDetailProps) => {
  const {
    state: { recipes },
  } = useRecipes();
  const {
    state: { user },
  } = useAuth();

  const recipe = recipes.find(
    ({ name }: any) => name === route.params.name
  );

  const [url, setUrl] = useState<string>('');
  const [localUrl, setLocalUrl] = useState<string>('');

  useEffect(() => {
    setUrl(recipe.downloadUrl);
    setLocalUrl(recipe.localImage);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {url && (
            <ImageItem
              image={url}
              localImage={localUrl}
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
    height: height,
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
