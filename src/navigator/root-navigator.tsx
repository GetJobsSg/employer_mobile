import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgetPasswordScreen, LoginScreen } from 'src/features/auth';
import { MyJobListingScreen } from 'src/features/my-job-listing';
import { CollectCardDetailScreen, PaymenMethodScreen } from 'src/features/stripe';

import { useAppSelector } from 'src/hooks';
import { RouteName } from './route';
import { RootStackParams } from './types';

const RootStack = createStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        {!isAuthenticated ? (
          <>
            <RootStack.Screen name={RouteName.AUTH_LOGIN} component={LoginScreen} />
            <RootStack.Screen name={RouteName.AUTH_FORGET_PASSWORD} component={ForgetPasswordScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen name={RouteName.PAYMENT_METHODS} component={PaymenMethodScreen} />
            <RootStack.Screen name={RouteName.COLLECT_CARD_DETAILS} component={CollectCardDetailScreen} />
            <RootStack.Screen name={RouteName.JOB_LISTING} component={MyJobListingScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
