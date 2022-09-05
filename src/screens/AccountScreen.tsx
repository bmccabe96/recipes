import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuthentication } from '../hooks/useAuth';
import { signOut, getAuth } from 'firebase/auth';
import { useAuth } from '../context/Auth';

const auth = getAuth();

const AccountScreen = () => {
  const {
    state: { user },
    authRemoveUser,
  } = useAuth();

  return (
    <>
      <View style={styles.container}>
        <Text>Account Screen</Text>
        <Button
          title="Sign out"
          onPress={() => {
            authRemoveUser(user);
            signOut(auth);
          }}
        />
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
});

export default AccountScreen;
