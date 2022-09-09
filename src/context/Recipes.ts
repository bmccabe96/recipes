import { useContext } from 'react';
import createDataContext from './createDataContext';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const RECIPES_LOAD = 'RECIPES_LOAD';

const recipesLoad = (dispatch: any) => async () => {
  //const data = require('../recipes.json');
  let data: any = [];
  const querySnapshot = await getDocs(
    collection(firestore, 'recipes')
  );
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  console.log(data);

  dispatch({ type: RECIPES_LOAD, recipes: data });
};

const recipesReducer = (state: Object[], action: any) => {
  switch (action.type) {
    case RECIPES_LOAD:
      return { recipes: action.recipes };
    default:
      return state;
  }
};

const { Context: RecipesContext, Provider: RecipesProvider } =
  createDataContext(recipesReducer, { recipesLoad }, { recipes: [] });

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
