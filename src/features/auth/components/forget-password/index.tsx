import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, Button, FormControl, Heading, Input, VStack, HStack, Text, Icon } from 'native-base';
import { emailValidator } from 'src/utils/validator';
import { useAppDispatch, useAppSelector, useCheckSuccess } from 'src/hooks';
import { getFirebaseErrMessage } from 'src/utils/errors';
import { CommonLayout } from 'src/constants/layout';
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
    <VStack px={CommonLayout.containerX} mt={4} space={6}>
      <FormControl isInvalid={touched[FieldName.email] && Boolean(errors[FieldName.email])}>
        <Input
          fontWeight="600"
          autoCapitalize="none"
          borderWidth={2}
          borderColor="gray.900"
          autoCorrect={false}
          onChangeText={handleChange(FieldName.email)}
          placeholder="Email"
          value={values[FieldName.email]}
        />
        <FormControl.ErrorMessage>{errors[FieldName.email]}</FormControl.ErrorMessage>
      </FormControl>

      {renderErrorContent()}

      <Button
        bgColor="gray.900"
        borderColor="gray.900"
        borderWidth={2}
        isLoadingText="Sending..."
        onPress={handleSubmit}
        isLoading={isLoadingSendResetPasswordEmail}
      >
        Send Reset Password Email
      </Button>
    </VStack>
  );

  const renderSuccessDialog = () => (
    <VStack mt={4} px={CommonLayout.containerX} space={4}>
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
    <VStack bg="white" safeArea>
      <HStack py={4} px={CommonLayout.containerX} justifyContent="flex-start" alignItems="center">
        <Icon
          mr={4}
          as={Ionicons}
          color="gray.900"
          name="chevron-back-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <Text flex={1} noOfLines={1} fontSize="xl" color="gray.900" fontWeight={700} my={2}>
          Forget Password
        </Text>
      </HStack>

      <Heading mx={4} mb={4} size="sm" fontWeight={300}>
        We will send a password reset email to your inbox. Please insert your registered email address
      </Heading>

      <VStack position="relative" h="100%" w="100%">
        {successSentEmail && renderSuccessDialog()}
        {!successSentEmail && renderSendEmailForm()}
      </VStack>
    </VStack>
  );
};

export default ForgetPasswordScreen;
