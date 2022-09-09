import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Recipes: undefined;
  RecipeDetail: { name: string; user: string };
  AddRecipe: undefined;
};

export type RecipesProps = NativeStackScreenProps<
  RootStackParamList,
  'Recipes'
>;

export type RecipeDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeDetail'
>;
