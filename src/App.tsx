import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';

import AuthListener from 'src/features/auth/authListener';
import StripeProvider from 'src/features/stripe/stripeProvider';
import RootNavigator from 'src/navigator/root-navigator';
import ErrorHandler from 'src/features/error-handler';
import { store } from 'src/store';

const App = () => (
  <Provider store={store}>
    <NativeBaseProvider>
      <AuthListener>
        <StripeProvider>
          <ErrorHandler>
            <RootNavigator />
          </ErrorHandler>
        </StripeProvider>
      </AuthListener>
    </NativeBaseProvider>
  </Provider>
);
export default App;
