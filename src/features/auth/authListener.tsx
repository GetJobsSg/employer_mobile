import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import { node } from 'prop-types';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { authActions } from 'src/features/auth/slice';

const AuthListener: React.FC = (props) => {
  const { children } = props;
  const [initializing, setInitializing] = useState(true);

  const dispatch = useAppDispatch();
  const { isLoadingSetCurrentUser } = useAppSelector((state) => state.auth);

  const idTokenChanged: FirebaseAuthTypes.AuthListenerCallback = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      dispatch(authActions.setCurrentUser(user));
    } else {
      dispatch(authActions.setCurrentUser(null));
    }

    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onIdTokenChanged(idTokenChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!initializing && !isLoadingSetCurrentUser) {
      SplashScreen.hide();
    }
  }, [initializing, isLoadingSetCurrentUser]);

  return <>{children}</>;
};

AuthListener.propTypes = {
  children: node,
};

export default AuthListener;
