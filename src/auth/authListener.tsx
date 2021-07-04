import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppDispatch } from 'src/hooks';
import { authActions } from 'src/auth/slice';

const AuthListener: React.FC = (props) => {
  const { children } = props;
  const [initializing, setInitializing] = useState(true);
  const dispatch = useAppDispatch();

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

  if (initializing) return null;
  return <>{children}</>;
};

AuthListener.propTypes = {
  children: node,
};

export default AuthListener;
