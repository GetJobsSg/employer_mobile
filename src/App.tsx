import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';

import AuthListener from 'src/features/auth/authListener';
import RootNavigator from 'src/navigator/root-navigator';
import ErrorHandler from 'src/features/error-handler';
import { store } from 'src/store';

const App = () => (
  <Provider store={store}>
    <NativeBaseProvider>
      <AuthListener>
        <ErrorHandler>
          <RootNavigator />
        </ErrorHandler>
      </AuthListener>
    </NativeBaseProvider>
  </Provider>
);
export default App;
