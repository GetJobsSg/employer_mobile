import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ErrorMessage } from 'src/constants';

export const getFirebaseErrMessage = (e: FirebaseAuthTypes.NativeFirebaseAuthError) => {
  const error = e.code as keyof typeof ErrorMessage;
  const errMessage = ErrorMessage[error] || 'Something went wrong';
  return errMessage;
};
