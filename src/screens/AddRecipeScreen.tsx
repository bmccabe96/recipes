import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useEffect, useState } from 'react';
import ImagePickerExample from '../components/ImagePicker';
import RecipeListItemAdder from '../components/RecipeListItemAdder';
import { storage } from '../config/firebase';
import { firestore } from '../config/firebase';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/Auth';
import { useRecipes } from '../context/Recipes';

export interface RecipeInput {
  name: string;
  category: string;
  servingSize: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  directions: string[];
  nutrition: string[];
  image: string;
  downloadUrl: string;
  user: string;
}

const AddRecipeScreen: React.FC<any> = ({ navigation }) => {
  const {
    state: { user },
  } = useAuth();
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
    downloadUrl: '',
    user: user,
  });

  const { recipesAdd } = useRecipes();
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

  useEffect(() => {
    if (input.downloadUrl) {
      recipesAdd(input);
      navigation.navigate('Recipes');
    }
  }, [input.downloadUrl]);

  const uploadImageAsync = async (uri: string) => {
    setIsLoading(true);
    const imgName = 'img-' + input.name;
    const storageRef = ref(storage, `images/${user}/${imgName}.jpg`);

    //convert image to array of bytes
    const img = await fetch(uri);
    const bytes = await img.blob();

    //Use uploadBytesResumable --> Firebase issue where uploadBytes crashes above 2MB
    const uploadTask = uploadBytesResumable(storageRef, bytes);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        console.log('Upload is done');
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            console.log('File available at', downloadURL);
            setInput({
              ...input,
              downloadUrl: downloadURL,
            });
          }
        );
      }
    );
  };

  if (isLoading) {
    return (
      <View>
        <Text
          style={{
            marginTop: 25,
            fontSize: 25,
            alignSelf: 'center',
          }}
        >
          SUBMITTING...
        </Text>
      </View>
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
          <Text style={styles.heading}>Add a photo</Text>

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
});

export default AddRecipeScreen;
