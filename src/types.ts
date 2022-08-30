import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Recipes: undefined;
  RecipeDetail: undefined;
};

export type RecipesProps = NativeStackScreenProps<
  RootStackParamList,
  'Recipes'
>;

export type RecipeDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeDetail'
>;
