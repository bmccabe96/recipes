import React from 'react';
import { useAuthentication } from '../hooks/useAuth';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import { RecipeFilterProvider } from '../context/RecipeFilter';

export default function RootNavigation() {
  const { firebaseUser } = useAuthentication();

  return firebaseUser ? (
    <RecipeFilterProvider>
      <UserStack />
    </RecipeFilterProvider>
  ) : (
    <AuthStack />
  );
}
