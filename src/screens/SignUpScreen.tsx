import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from 'firebase/auth';

interface UserInput {
  email: string;
  password: string;
  error: string;
}

//TODO
const SignUpScreen: React.FC<NativeStackScreenProps<any>> = () => {
  const [value, setValue] = useState<UserInput>({
    email: '',
    password: '',
    error: '',
  });

  const signUp = (): void => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'You must enter a username and password',
      });
      return;
    }

    setValue({
      ...value,
      error: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}
      <View style={styles.controls}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={value.password}
          onChangeText={(text) =>
            setValue({ ...value, password: text })
          }
        />
        <Button title="Sign up" onPress={signUp} />
      </View>
    </SafeAreaView>
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

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignUpScreen;
