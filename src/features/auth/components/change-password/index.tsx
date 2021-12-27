import React, { useEffect } from 'react';
import { Alert, Button, FormControl, Icon, Input, VStack } from 'native-base';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Header from 'src/components/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { CommonLayout } from 'src/constants/layout';
import { cNewPasswordValidator, newPasswordValidator, passwordValidator } from 'src/utils/validator';
import { useDispatch } from 'react-redux';
import { useAppSelector, useCheckSuccess } from 'src/hooks';
import { getFirebaseErrMessage } from 'src/utils/errors';
import { authActions } from '../../slice';

enum FieldName {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
  cNewPassword = 'cNewPassword',
}

const validationSchema = yup.object({
  [FieldName.currentPassword]: passwordValidator,
  [FieldName.newPassword]: newPasswordValidator,
  [FieldName.cNewPassword]: cNewPasswordValidator(FieldName.newPassword),
});

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const {
    user: { email },
    isLoadingChangePassword,
    errorChangePassword,
  } = useAppSelector((state) => state.auth);

  const navigation = useNavigation();

  const { errors, handleChange, handleSubmit, values, touched } = useFormik({
    initialValues: {
      [FieldName.currentPassword]: '',
      [FieldName.newPassword]: '',
      [FieldName.cNewPassword]: '',
    },
    validationSchema,
    onSubmit: (val) => {
      dispatch(
        authActions.changePasswordRequest({
          currentEmail: email,
          currentPassword: val.currentPassword,
          newPassword: val.cNewPassword,
        }),
      );
    },
  });

  const renderLoginErrorContent = () => {
    if (!errorChangePassword) return null;
    const msg = getFirebaseErrMessage(errorChangePassword);
    return (
      <Alert status="error">
        <Alert.Icon size="xs" />
        <Alert.Description flexShrink={1}>{msg}</Alert.Description>
      </Alert>
    );
  };

  // sucessfully change password
  const successChangePasword = useCheckSuccess({
    loadingState: isLoadingChangePassword,
    error: errorChangePassword,
  });

  useEffect(() => {
    if (successChangePasword) {
      navigation.goBack();
    }
  }, [navigation, successChangePasword]);

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Change Password"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />

      <VStack px={CommonLayout.containerX} space={4} mt={2}>
        <FormControl isInvalid={touched[FieldName.currentPassword] && Boolean(errors[FieldName.currentPassword])}>
          <Input
            fontWeight="600"
            autoCapitalize="none"
            borderWidth={2}
            borderColor="gray.900"
            type="password"
            autoCorrect={false}
            onChangeText={handleChange(FieldName.currentPassword)}
            placeholder="Current Password"
            value={values[FieldName.currentPassword]}
          />
          <FormControl.ErrorMessage>{errors[FieldName.currentPassword]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={touched[FieldName.newPassword] && Boolean(errors[FieldName.newPassword])}>
          <Input
            fontWeight="600"
            autoCapitalize="none"
            borderWidth={2}
            borderColor="gray.900"
            type="password"
            autoCorrect={false}
            onChangeText={handleChange(FieldName.newPassword)}
            placeholder="New Password"
            value={values[FieldName.newPassword]}
          />
          <FormControl.ErrorMessage>{errors[FieldName.newPassword]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={touched[FieldName.cNewPassword] && Boolean(errors[FieldName.cNewPassword])}>
          <Input
            fontWeight="600"
            autoCapitalize="none"
            borderWidth={2}
            type="password"
            borderColor="gray.900"
            autoCorrect={false}
            onChangeText={handleChange(FieldName.cNewPassword)}
            placeholder="Confirm New Password"
            value={values[FieldName.cNewPassword]}
          />
          <FormControl.ErrorMessage>{errors[FieldName.cNewPassword]}</FormControl.ErrorMessage>
        </FormControl>

        {renderLoginErrorContent()}

        <Button
          bgColor="gray.900"
          borderColor="gray.900"
          borderWidth={2}
          onPress={handleSubmit}
          isLoading={isLoadingChangePassword}
        >
          Submit
        </Button>
      </VStack>
    </VStack>
  );
};

export default ChangePasswordScreen;
