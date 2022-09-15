import { useContext } from 'react';
import createDataContext from './createDataContext';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { connectStorageEmulator } from 'firebase/storage';

const RECIPES_LOAD = 'RECIPES_LOAD';
const RECIPES_ADD = 'RECIPES_ADD';

const recipesLoad = (dispatch: any) => async (user: string) => {
  //const data = require('../recipes.json');
  let data: any = [];
  const querySnapshot = await getDocs(
    collection(firestore, 'recipes')
  );
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  data = data.filter((item: any) => item.user === user);

  dispatch({ type: RECIPES_LOAD, recipes: data });
};

const recipesAdd = (dispatch: any) => async (newRecipe: object) => {
  try {
    const docRef = await addDoc(collection(firestore, 'recipes'), {
      ...newRecipe,
    });
    console.log('Document written with ID: ', docRef.id);
    dispatch({ type: RECIPES_ADD, recipe: newRecipe });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const recipesReducer = (state: any, action: any) => {
  switch (action.type) {
    case RECIPES_LOAD:
      return { recipes: action.recipes };
    case RECIPES_ADD:
      return { recipes: [...state.recipes, action.recipe] };
    default:
      return state;
  }
};

const { Context: RecipesContext, Provider: RecipesProvider } =
  createDataContext(
    recipesReducer,
    { recipesLoad, recipesAdd },
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
