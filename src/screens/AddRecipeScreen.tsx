import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import ImagePickerExample from '../components/ImagePicker';
import ImageManipulator from 'expo-image-manipulator';
import RecipeListItemAdder from '../components/RecipeListItemAdder';
import { storage } from '../config/firebase';
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { useAuth } from '../context/Auth';

interface RecipeInput {
  name: string;
  category: string;
  servingSize: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  directions: string[];
  nutrition: string[];
  image: string;
}

const AddRecipeScreen: React.FC<any> = ({ navigation }) => {
  const [input, setInput] = useState<RecipeInput>({
    name: '',
    category: '',
    servingSize: '',
    prepTime: '',
    cookTime: '',
    ingredients: [],
    directions: [],
    nutrition: [],
    image: '',
  });
  const {
    state: { user },
  } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setImage = (image: string) => {
    setInput({
      ...input,
      image: image,
    });
  };

  const setListItemData = (data: string[], key: string) => {
    setInput({
      ...input,
      [key]: data,
    });
  };

  const uploadImageAsync = async (uri: string) => {
    setIsLoading(true);
    const imgName = 'img-' + input.name;
    const storageRef = ref(storage, `images/${user}/${imgName}.jpg`);

    //convert image to array of bytes
    const img = await fetch(uri);
    const bytes = await img.blob();
    //console.log(bytes.size);
    //await uploadBytes(storageRef, bytes);

    navigation.navigate('Recipes');
  };

  const printState = () => {
    console.log(input);
  };

  if (isLoading) {
    return (
      <Text
        style={{
          marginTop: 25,
          fontSize: 25,
          alignSelf: 'center',
        }}
      >
        SUBMITTING...
      </Text>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={1}
        >
          <Text
            style={{
              fontSize: 24,
              marginTop: 25,
              alignSelf: 'center',
            }}
          >
            Main details...
          </Text>
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
            placeholder="serving size"
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
          <Text
            style={{
              fontSize: 24,
              marginTop: 25,
              alignSelf: 'center',
            }}
          >
            Ingredients...
          </Text>
          <RecipeListItemAdder
            data={input.ingredients}
            setListItemData={setListItemData}
            listType="ingredients"
          />
          <Text
            style={{
              fontSize: 24,
              marginTop: 25,
              alignSelf: 'center',
            }}
          >
            Directions...
          </Text>
          <RecipeListItemAdder
            data={input.directions}
            setListItemData={setListItemData}
            listType="directions"
          />
          <Text
            style={{
              fontSize: 24,
              marginTop: 25,
              alignSelf: 'center',
            }}
          >
            Nutrition...
          </Text>
          <RecipeListItemAdder
            data={input.nutrition}
            setListItemData={setListItemData}
            listType="nutrition"
          />
          {input.image && (
            <Image
              source={{ uri: input.image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                marginTop: 15,
                alignSelf: 'center',
              }}
            />
          )}
          <ImagePickerExample setImage={setImage} />
          <TouchableOpacity
            style={styles.button}
            onPress={printState}
          >
            <Text style={styles.text}>TEST STATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => uploadImageAsync(input.image)}
          >
            <Text style={styles.text}>Confirm</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
  scrollView: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default AddRecipeScreen;
