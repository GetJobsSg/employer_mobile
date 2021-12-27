import * as yup from 'yup';

export const emailValidator = yup.string().required('Email is mandatory.').email('Email format is invalid.');

export const passwordValidator = yup
  .string()
  .required('Password is mandatory.')
  .min(6, 'Please use at least 6 characters.');

export const newPasswordValidator = yup
  .string()
  .required('Please insert your new password.')
  .min(6, 'Please use at least 6 characters.');

export const cNewPasswordValidator = (passwordFieldKey: string) =>
  yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref(passwordFieldKey), null], 'Password is not match');
