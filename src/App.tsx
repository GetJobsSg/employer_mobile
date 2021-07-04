import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { store } from 'src/store';
import AuthListener from 'src/features/auth/authListener';
import RootNavigator from 'src/navigator/root-navigator';

const App = () => (
  <Provider store={store}>
    <NativeBaseProvider>
      <AuthListener>
        <RootNavigator />
      </AuthListener>
    </NativeBaseProvider>
  </Provider>
);
export default App;
