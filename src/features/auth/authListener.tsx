import React, { useState, useEffect } from 'react';
import { Spinner, Center } from 'native-base';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
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

  if (initializing || isLoadingSetCurrentUser) {
    return (
      <Center w="100%" h="100%">
        <Spinner size="sm" />
      </Center>
    );
  }
  return <>{children}</>;
};

AuthListener.propTypes = {
  children: node,
};

export default AuthListener;
