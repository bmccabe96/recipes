import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

interface UserInput {
  email: string;
  password: string;
  error: string;
}

const SignInScreen: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  const [value, setValue] = useState<UserInput>({
    email: '',
    password: '',
    error: '',
  });

  const signIn = async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'You must enter a username and password',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
    } catch (e: any) {
      setValue({
        ...value,
        error: e.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}
      <View style={styles.controls}>
        <View style={styles.row}>
          <Icon name="envelope" size={16} />
          <TextInput
            placeholder="email"
            style={styles.input}
            value={value.email}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              setValue({ ...value, email: text })
            }
          />
        </View>

        <View style={styles.row}>
          <Icon name="key" size={16} />
          <TextInput
            placeholder="password"
            style={styles.input}
            value={value.password}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              setValue({ ...value, password: text })
            }
          />
        </View>

        <Button title="Sign in" onPress={signIn} />
      </View>
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

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
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

export default SignInScreen;
