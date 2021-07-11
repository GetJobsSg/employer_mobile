import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Button, FormControl, Heading, Input, VStack, HStack, Text } from 'native-base';
import { emailValidator } from 'src/utils/validator';
import { useAppDispatch, useAppSelector, useCheckSuccess } from 'src/hooks';
import { getFirebaseErrMessage } from 'src/utils/errors';
import { authActions } from '../../slice';
import { ForgetPasswordScreenProps } from '../../types';

enum FieldName {
  email = 'email',
}

const schema = yup.object({
  [FieldName.email]: emailValidator,
});

const ForgetPasswordScreen = (props: ForgetPasswordScreenProps) => {
  const { navigation } = props;

  const dispatch = useAppDispatch();
  const { isLoadingSendResetPasswordEmail, error: firebaseError } = useAppSelector((state) => state.auth);

  const { errors, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      [FieldName.email]: '',
    },
    validationSchema: schema,
    onSubmit: (_values) => {
      const { email } = _values;
      dispatch(authActions.sendResetPasswordEmail(email));
    },
  });

  // successfully send email
  const successSentEmail = useCheckSuccess({ loadingState: isLoadingSendResetPasswordEmail, error: firebaseError });

  const renderErrorContent = () => {
    if (!firebaseError) return null;
    const msg = getFirebaseErrMessage(firebaseError);
    return (
      <Alert status="error">
        <Alert.Icon size="xs" />
        <Alert.Description flexShrink={1}>{msg}</Alert.Description>
      </Alert>
    );
  };

  const renderSendEmailForm = () => (
    <>
      <HStack mx={4} mt={4} mb={2} justifyContent="space-between">
        <Text fontSize="xl" fontWeight={800}>
          Forget Password
        </Text>
      </HStack>

      <Heading mx={4} mb={4} size="sm" fontWeight={300}>
        We will send a password reset email to your inbox. Please insert your registered email address
      </Heading>

      <VStack mx={4} mt={4} space={6}>
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

        {renderErrorContent()}

        <Button isLoadingText="Sending..." onPress={handleSubmit} isLoading={isLoadingSendResetPasswordEmail}>
          Send Email
        </Button>
      </VStack>
    </>
  );

  const renderSuccessDialog = () => (
    <VStack mt={4} mx={4} space={4}>
      <Alert
        p={4}
        borderRadius={10}
        status="success"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Alert.Icon mb={4} size="xl" />
        <Alert.Description>
          <Text textAlign="center">
            We have sent an email to <Text fontWeight="bold">{values[FieldName.email]}</Text>. Click the link in the
            email to reset your password.
          </Text>
        </Alert.Description>
      </Alert>
      <Button onPress={() => navigation.goBack()}>OK</Button>
    </VStack>
  );

  return (
    <Box safeArea bg="white" position="relative" h="100%" w="100%">
      {successSentEmail && renderSuccessDialog()}
      {!successSentEmail && renderSendEmailForm()}
    </Box>
  );
};

export default ForgetPasswordScreen;
