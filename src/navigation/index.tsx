import React from 'react';
import { useAuthentication } from '../hooks/useAuth';
import AuthStack from './AuthStack';
import UserStack from './UserStack';

export default function RootNavigation() {
  const { firebaseUser } = useAuthentication();

  return firebaseUser ? <UserStack /> : <AuthStack />;
}
