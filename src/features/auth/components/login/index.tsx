import React, { useState } from 'react';
import { Box, Button, FormControl, Heading, Input, VStack } from 'native-base';
// import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'src/hooks';
// import { emailValidator, passwordValidator } from 'src/utils/validator';
import { authActions } from '../../slice';

// const loginSchema = yup.object({
//   email: emailValidator,
//   password: passwordValidator,
// });

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { isLoadingLogin } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(authActions.login({ email, password }));
  };

  const isFormValid = () => {
    if (!email || !password) return false;
    return true;
  };

  return (
    <Box pt={8} safeArea bg="white" position="relative" h="100%" w="100%">
      <VStack space={4} mx={4}>
        <Heading color="primary.600" size="md">
          GetJobs Business
        </Heading>

        <FormControl>
          <Input width="100%" value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" />
          <FormControl.ErrorMessage>Invalid Email</FormControl.ErrorMessage>
        </FormControl>

        <FormControl>
          <Input
            width="100%"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
          />
          <FormControl.ErrorMessage>Password Incorrect</FormControl.ErrorMessage>
        </FormControl>

        <Button disabled={!isFormValid()} onPress={handleLogin} isLoading={isLoadingLogin}>
          {!isLoadingLogin && 'Login'}
        </Button>

        <Button variant="ghost">Forget Password</Button>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
