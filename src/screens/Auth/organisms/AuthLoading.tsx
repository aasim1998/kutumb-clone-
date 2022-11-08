import React, {useEffect} from 'react';
import {Auth, Main} from 'screens/Navigation';
import useAuth from 'context/Authentication';
import {Spinner} from 'atoms/Spinner';
import {Box} from 'atoms/Box';
import {subscribe, unsubscribe} from 'utils/EventEmitter';

export const AuthLoading = () => {
  const {
    actions: {getUserFromStorage, logout},
    state: {isLoggedIn, authenticating, isAppLoading},
  } = useAuth();
  useEffect(() => {
    subscribe('logout', logout);
    return () => unsubscribe('logout');
  });
  useEffect(() => {
    if (!authenticating && !isLoggedIn) {
      getUserFromStorage();
    }
  }, [getUserFromStorage, authenticating, isLoggedIn]);
  if (isAppLoading) {
    return (
      <Box flex={1} justifyContent="center">
        <Spinner color="primary" size="large" />
      </Box>
    );
  }
  return isLoggedIn ? <Main /> : <Auth />;
};
