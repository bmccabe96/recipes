import { useContext } from 'react';
import createDataContext from './createDataContext';

const SET_USER = 'SET_USER';

const authSetUser = (dispatch: any) => (user: string) => {
  dispatch({ type: SET_USER, user: user });
};

const authReducer = (state: Object[], action: any) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.user };
    default:
      return state;
  }
};

const { Context: AuthContext, Provider: AuthProvider } =
  createDataContext(authReducer, { authSetUser }, { user: '' });

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside a AuthProvider');
  }

  return context;
};

export { AuthContext, useAuth };
