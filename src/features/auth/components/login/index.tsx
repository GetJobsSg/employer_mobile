import React from 'react';
import { Box, Button, FormControl, Heading, Input, VStack } from 'native-base';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { emailValidator, passwordValidator } from 'src/utils/validator';
import { authActions } from '../../slice';

const loginSchema = yup.object({
  email: emailValidator,
  password: passwordValidator,
});

enum FieldName {
  email = 'email',
  password = 'password',
}

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { isLoadingLogin } = useAppSelector((state) => state.auth);

  const { errors, handleSubmit, handleChange, isSubmitting, isValidating, touched, values } = useFormik({
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

  const isSubmitButtonLoading = isSubmitting || isValidating || isLoadingLogin;

  return (
    <Box pt={8} safeArea bg="white" position="relative" h="100%" w="100%">
      <VStack space={4} mx={4}>
        <Heading color="primary.600" size="md">
          GetJobs Business
        </Heading>

        <FormControl isInvalid={touched.email && Boolean(errors.email)}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange(FieldName.email)}
            placeholder="Email"
            value={values.email}
          />
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={touched.password && Boolean(errors.password)}>
          <Input
            autoCapitalize="none"
            onChangeText={handleChange(FieldName.password)}
            secureTextEntry
            placeholder="Password"
            value={values.password}
          />
          <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
        </FormControl>

        <Button isLoadingText="Logging in..." onPress={handleSubmit} isLoading={isSubmitButtonLoading}>
          Login
        </Button>

        <Button variant="ghost">Forget Password</Button>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
