import { useContext } from 'react';
import createDataContext from './createDataContext';
import { User } from 'firebase/auth';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const authSetUser =
  (dispatch: any) => (user: string, firebaseUser: User) => {
    dispatch({
      type: SET_USER,
      user: user,
      firebaseUser: firebaseUser,
    });
  };

const authRemoveUser = (dispatch: any) => () => {
  dispatch({ type: REMOVE_USER });
};

const authReducer = (state: Object[], action: any) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.user, firebaseUser: action.firebaseUser };
    case REMOVE_USER:
      return { user: '', firebaseUser: null };
    default:
      return state;
  }
};

const { Context: AuthContext, Provider: AuthProvider } =
  createDataContext(
    authReducer,
    { authSetUser, authRemoveUser },
    { user: '', firebaseUser: null }
  );

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
