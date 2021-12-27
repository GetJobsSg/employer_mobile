import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { IChangePasswordPayload } from 'src/shared/types';

export const login = (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> =>
  auth().signInWithEmailAndPassword(email, password);

export const sendPasswordResetEmail = (email: string) => auth().sendPasswordResetEmail(email);

export const changePassword = (data: IChangePasswordPayload) => {
  const { currentEmail, currentPassword, newPassword } = data;
  const cred = auth.EmailAuthProvider.credential(currentEmail, currentPassword);
  return auth()
    .currentUser?.reauthenticateWithCredential(cred)
    .then(() => {
      auth().currentUser?.updatePassword(newPassword);
    });
};

export const logout = (): Promise<void> => auth().signOut();
