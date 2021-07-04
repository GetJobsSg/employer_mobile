import * as yup from 'yup';

export const emailValidator = yup.string().required('Email is mandatory.').email('Email format is invalid.');

export const passwordValidator = yup
  .string()
  .required('Password is mandatory.')
  .min(6, 'Please use at least 6 characters.');
