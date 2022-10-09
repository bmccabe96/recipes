import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect } from 'react';
import { useRecipes } from '../context/Recipes';

import ImageItem from '../components/ImageItem';
import RecipeListItemAdder from '../components/RecipeListItemAdder';

import { RecipeInput } from '../screens/AddRecipeScreen';
import { useAuth } from '../context/Auth';

const width = Dimensions.get('window').width / 2;

const EditRecipeScreen: React.FC<any> = ({ route, navigation }) => {
  const { recipesEdit, recipesLoad } = useRecipes();
  const {
    state: { user },
  } = useAuth();

  const [url, setUrl] = useState<string>('');
  const [localUrl, setLocalUrl] = useState<string>('');
  const [input, setInput] = useState<RecipeInput>(
    route.params.recipe
  );

  useEffect(() => {
    setUrl(route.params.recipe.downloadUrl);
    setLocalUrl(route.params.recipe.localImage);
  }, []);

  const setListItemData = (data: string[], key: string) => {
    setInput({
      ...input,
      [key]: data,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {url && (
          <ImageItem
            image={url}
            localImage={localUrl}
            style={styles.image}
          />
        )}
        <KeyboardAwareScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={1}
        >
          <Text style={styles.heading}>Main details</Text>
          <TextInput
            placeholder="name"
            style={styles.input}
            value={input.name}
            onChangeText={(text) =>
              setInput({ ...input, name: text })
            }
          />
          <TextInput
            placeholder="category"
            style={styles.input}
            value={input.category}
            onChangeText={(text) =>
              setInput({ ...input, category: text })
            }
          />
          <TextInput
            placeholder="servings"
            style={styles.input}
            value={input.servingSize}
            onChangeText={(text) =>
              setInput({ ...input, servingSize: text })
            }
          />
          <TextInput
            placeholder="prep time"
            style={styles.input}
            value={input.prepTime}
            onChangeText={(text) =>
              setInput({ ...input, prepTime: text })
            }
          />
          <TextInput
            placeholder="cook time"
            style={styles.input}
            value={input.cookTime}
            onChangeText={(text) =>
              setInput({ ...input, cookTime: text })
            }
          />
          <Text style={styles.heading}>Ingredients</Text>
          <RecipeListItemAdder
            data={input.ingredients}
            setListItemData={setListItemData}
            listType="ingredients"
          />
          <Text style={styles.heading}>Directions</Text>
          <RecipeListItemAdder
            data={input.directions}
            setListItemData={setListItemData}
            listType="directions"
          />
          <Text style={styles.heading}>Nutrition</Text>
          <RecipeListItemAdder
            data={input.nutrition}
            setListItemData={setListItemData}
            listType="nutrition"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              recipesEdit(input, navigation.navigate);
              recipesLoad(user);
            }}
          >
            <Text style={styles.text}>Confirm</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  );
};

export default EditRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginTop: 25,
    alignSelf: 'center',
  },
  control: {
    marginTop: 10,
  },

  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 4,
    borderColor: 'blue',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderColor: 'blue',
    borderWidth: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'blue',
  },
  subText: {
    fontSize: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 100,
    marginTop: 5,
    marginBottom: 15,
  },
});
