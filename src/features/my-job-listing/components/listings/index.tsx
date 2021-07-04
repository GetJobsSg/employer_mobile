import React from 'react';
import { Box, Button } from 'native-base';
import { useAppDispatch } from 'src/hooks';
import { authActions } from 'src/features/auth/slice';

const MyJobListingScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};

export default MyJobListingScreen;
