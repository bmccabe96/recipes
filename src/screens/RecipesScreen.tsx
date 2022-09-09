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

  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    recipesLoad();
  }, []);

  console.log(user);

  const getFileTest = async () => {
    //'gs://recipes-react-97ff8.appspot.com/images/ZkDwcjpOf3dZwd1oEtuQNYVsyQv2/img-Eve.jpg';
    const storageRef = ref(storage, `images/${user}/img-Eve.jpg`);
    await getDownloadURL(storageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        console.log(error.code);
      });
    console.log(url);
  };

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
                  user: user,
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        {url && (
          <Image
            source={{ uri: url }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button title="Test fetch image" onPress={getFileTest} />
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
