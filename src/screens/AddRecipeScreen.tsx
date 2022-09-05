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
import React, { useState } from 'react';
import ImagePickerExample from '../components/ImagePicker';

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

const AddRecipeScreen: React.FC<any> = () => {
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

  const setImage = (image: string) => {
    setInput({
      ...input,
      image: image,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
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
            Enter details...
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
          <View style={styles.row}>
            <Button title="Ingredients" />
            <Text style={styles.subText}>(5)</Text>
          </View>
          <View style={styles.row}>
            <Button title="Directions" />
            <Text style={styles.subText}>(8)</Text>
          </View>
          <View style={styles.row}>
            <Button title="Nutrition" />
            <Text style={styles.subText}>(4)</Text>
          </View>
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Confirm</Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: 60,
    margin: 12,
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
