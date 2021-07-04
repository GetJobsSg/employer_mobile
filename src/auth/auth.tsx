import React from 'react';
import { Box, Button } from 'native-base';
import { useAppDispatch } from 'src/hooks';
import { authActions } from './slice';

const AuthScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(authActions.login({ email: 'tbs@employer.com', password: 'asdasd' }));
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box safeArea>
      <Button onPress={handleLogin}>Login</Button>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};

export default AuthScreen;
