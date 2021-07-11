import React, { useEffect } from 'react';
import { Alert, Box, Button, FormControl, Heading, Input, VStack } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { emailValidator, passwordValidator } from 'src/utils/validator';
import { authActions } from 'src/features/auth/slice';
import { getFirebaseErrMessage } from 'src/utils/errors';
import { RouteName } from 'src/navigator/route';
import { LoginScreenProps } from '../../types';

const loginSchema = yup.object({
  email: emailValidator,
  password: passwordValidator,
});

enum FieldName {
  email = 'email',
  password = 'password',
}

const LoginScreen = (props: LoginScreenProps) => {
  const { navigation } = props;

  const dispatch = useAppDispatch();
  const { isLoadingLogin, error: firebaseError } = useAppSelector((state) => state.auth);

  const { errors, handleSubmit, handleChange, touched, values, resetForm } = useFormik({
    initialValues: {
      [FieldName.email]: '',
      [FieldName.password]: '',
    },
    validationSchema: loginSchema,
    onSubmit: (_values) => {
      const { email, password } = _values;
      dispatch(authActions.login({ email, password }));
    },
  });

  const isFocused = useIsFocused();
  useEffect(() => resetForm(), [resetForm, isFocused]);

  const renderLoginErrorContent = () => {
    if (!firebaseError) return null;

    const msg = getFirebaseErrMessage(firebaseError);
    return (
      <Alert status="error">
        <Alert.Icon size="xs" />
        <Alert.Description flexShrink={1}>{msg}</Alert.Description>
      </Alert>
    );
  };

  return (
    <Box pt={8} safeArea bg="white" position="relative" h="100%" w="100%">
      <VStack space={6} mx={4}>
        <Heading color="primary.600" size="lg">
          GetJobs Business
        </Heading>

        <FormControl isInvalid={touched[FieldName.email] && Boolean(errors[FieldName.email])}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange(FieldName.email)}
            placeholder="Email"
            value={values[FieldName.email]}
          />
          <FormControl.ErrorMessage>{errors[FieldName.email]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={touched[FieldName.password] && Boolean(errors[FieldName.password])}>
          <Input
            autoCapitalize="none"
            onChangeText={handleChange(FieldName.password)}
            secureTextEntry
            placeholder="Password"
            value={values[FieldName.password]}
          />
          <FormControl.ErrorMessage>{errors[FieldName.password]}</FormControl.ErrorMessage>
        </FormControl>

        {renderLoginErrorContent()}

        <Button isLoadingText="Logging in..." onPress={handleSubmit} isLoading={isLoadingLogin}>
          Login
        </Button>

        <Button variant="ghost" onPress={() => navigation.push(RouteName.AUTH_FORGET_PASSWORD)}>
          Forget Password
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
