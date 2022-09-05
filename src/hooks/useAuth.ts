import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '../config/firebase';
import { useAuth } from '../context/Auth';

const auth = getAuth();

export function useAuthentication() {
  const [firebaseUser, setUser] = React.useState<User>();
  const {
    state: { user },
    authSetUser,
  } = useAuth();

  React.useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          authSetUser(firebaseUser.uid);
          setUser(firebaseUser);
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    firebaseUser,
  };
}
