import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgetPasswordScreen, LoginScreen } from 'src/features/auth';
import { ParticipantListingScreen } from 'src/features/participant-listings';
import { JobDetailScreen } from 'src/features/job-details';
import { JobListingScreen } from 'src/features/job-listings';
import { ProfileScreen } from 'src/features/profile';
import { CollectCardDetailScreen, PaymenMethodScreen } from 'src/features/stripe';

import { useAppSelector } from 'src/hooks';
import { RouteName } from './route';
import { RootStackParams } from './types';

const RootStack = createStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={isAuthenticated ? RouteName.JOB_LISTING : RouteName.AUTH_LOGIN}
        headerMode="none"
      >
        {!isAuthenticated ? (
          <>
            <RootStack.Screen name={RouteName.AUTH_LOGIN} component={LoginScreen} />
            <RootStack.Screen name={RouteName.AUTH_FORGET_PASSWORD} component={ForgetPasswordScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen name={RouteName.JOB_LISTING} component={JobListingScreen} />
            <RootStack.Screen name={RouteName.JOB_DETAILS} component={JobDetailScreen} />
            <RootStack.Screen name={RouteName.PARTICIPANTS_LISTING} component={ParticipantListingScreen} />

            <RootStack.Screen name={RouteName.PROFILE} component={ProfileScreen} />

            <RootStack.Screen name={RouteName.PAYMENT_METHODS} component={PaymenMethodScreen} />
            <RootStack.Screen name={RouteName.COLLECT_CARD_DETAILS} component={CollectCardDetailScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
