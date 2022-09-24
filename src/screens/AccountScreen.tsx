import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuthentication } from '../hooks/useAuth';
import { signOut, getAuth } from 'firebase/auth';
import { useAuth } from '../context/Auth';

const auth = getAuth();

const AccountScreen = () => {
  const {
    state: { user, firebaseUser },
    authRemoveUser,
  } = useAuth();

  return (
    <>
      <View style={styles.container}>
        {firebaseUser && (
          <Text style={styles.email}>{firebaseUser.email}</Text>
        )}
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
    backgroundColor: '#f0f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    fontSize: 20,
  },
});

export default AccountScreen;
