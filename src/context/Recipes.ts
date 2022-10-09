import { useContext } from 'react';
import createDataContext from './createDataContext';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { connectStorageEmulator } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import { ActionSheetIOS } from 'react-native';

const RECIPES_LOAD = 'RECIPES_LOAD';
const RECIPES_ADD = 'RECIPES_ADD';
const RECIPES_DELETE = 'RECIPES_DELETE';
const RECIPES_EDIT = 'RECIPES_EDIT';

const cacheImage = async (uri: string, docId: string) => {
  await FileSystem.downloadAsync(
    uri,
    FileSystem.documentDirectory + docId + '.jpg'
  ).then(({ uri }) => console.log(uri + 'asset cached successfully'));
};

const recipesLoad = (dispatch: any) => async (user: string) => {
  //const data = require('../recipes.json');
  let data: any = [];
  const querySnapshot = await getDocs(
    collection(firestore, 'recipes')
  );
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
      localImage: FileSystem.documentDirectory + doc.id + '.jpg',
    });
  });

  querySnapshot.forEach((doc) =>
    cacheImage(doc.data().image, doc.id)
  );

  data = data.filter((item: any) => item.user === user);

  dispatch({ type: RECIPES_LOAD, recipes: data });
};

const recipesAdd = (dispatch: any) => async (newRecipe: any) => {
  try {
    const docRef = await addDoc(collection(firestore, 'recipes'), {
      ...newRecipe,
    });
    console.log('Document written with ID: ', docRef.id);
    cacheImage(newRecipe.downloadUrl, docRef.id);
    dispatch({
      type: RECIPES_ADD,
      recipe: {
        ...newRecipe,
        id: docRef.id,
        localImage: FileSystem.documentDirectory + docRef.id + '.jpg',
      },
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const recipesEdit =
  (dispatch: any) => async (recipe: any, navigate: any) => {
    const docRef = await doc(firestore, 'recipes', recipe.id);

    const date = new Date();
    const currentTime =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate();
    try {
      await updateDoc(docRef, { ...recipe, updated: currentTime });
      dispatch({
        type: RECIPES_EDIT,
        recipe: recipe,
      });
      navigate('Recipes');
    } catch (e) {
      console.error('Error updating document');
    }
  };

const recipesDelete = (dispatch: any) => async (docId: any) => {
  const docRef = doc(firestore, 'recipes', docId);
  deleteDoc(docRef)
    .then(() => {
      console.log('Entire Document has been deleted successfully.');
      dispatch({ type: RECIPES_DELETE, id: docId });
    })
    .catch((error) => {
      console.log(error);
    });
};

const recipesReducer = (state: any, action: any) => {
  switch (action.type) {
    case RECIPES_LOAD:
      return { recipes: action.recipes };
    case RECIPES_ADD:
      return { recipes: [...state.recipes, action.recipe] };
    case RECIPES_EDIT:
      return { recipes: [...state.recipes, action.recipe] };
    case RECIPES_DELETE:
      return {
        recipes: state.recipes.filter(
          (item: any) => item.id !== action.id
        ),
      };
    default:
      return state;
  }
};

const { Context: RecipesContext, Provider: RecipesProvider } =
  createDataContext(
    recipesReducer,
    { recipesLoad, recipesAdd, recipesDelete, recipesEdit },
    { recipes: [] }
  );

const useRecipes = () => {
  const context = useContext(RecipesContext);

  if (context === undefined) {
    throw new Error(
      'useRecipes must be used inside a RecipesProvider'
    );
  }

  return context;
};

export { RecipesProvider, useRecipes };
