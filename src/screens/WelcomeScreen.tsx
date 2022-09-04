import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from 'react-navigation-stack';
import ImagePickerExample from '../components/ImagePicker';

const WelcomeScreen: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes - Make some food!</Text>

      <View style={styles.buttons}>
        <Button
          title="Sign in"
          onPress={() => navigation.navigate('Sign In')}
        />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate('Sign Up')}
        />
      </View>
      <ImagePickerExample />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
  },
  buttons: {
    flex: 1,
    paddingTop: 20,
  },
});

export default WelcomeScreen;
