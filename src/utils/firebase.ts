import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const login = (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> =>
  auth().signInWithEmailAndPassword(email, password);

export const sendPasswordResetEmail = (email: string) => auth().sendPasswordResetEmail(email);

export const logout = (): Promise<void> => auth().signOut();
