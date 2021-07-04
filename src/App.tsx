import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { store } from 'src/store';
import AuthListener from 'src/auth/authListener';
import AuthScreen from './auth/auth';

const App = () => (
  <Provider store={store}>
    <AuthListener>
      <NativeBaseProvider>
        <AuthScreen />
      </NativeBaseProvider>
    </AuthListener>
  </Provider>
);
export default App;
