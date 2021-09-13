import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgetPasswordScreen, LoginScreen } from 'src/features/auth';
import { ParticipantListingScreen } from 'src/features/participant-listings';
import { JobDetailScreen } from 'src/features/job-details';
import { JobListingScreen } from 'src/features/job-listings';
import { WorkerListingScreen } from 'src/features/worker-listings';
import { AttendanceRecordScreen } from 'src/features/attendance-record';
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
        initialRouteName={isAuthenticated ? RouteName.ATTENDANCE_RECORD : RouteName.AUTH_LOGIN}
        headerMode="none"
      >
        {!isAuthenticated ? (
          <>
            <RootStack.Screen name={RouteName.ATTENDANCE_RECORD} component={LoginScreen} />
            <RootStack.Screen name={RouteName.AUTH_FORGET_PASSWORD} component={ForgetPasswordScreen} />
          </>
        ) : (
          <>
            <RootStack.Screen name={RouteName.ATTENDANCE_RECORD} component={AttendanceRecordScreen} />
            <RootStack.Screen name={RouteName.WORKER_LISTING} component={WorkerListingScreen} />
            <RootStack.Screen name={RouteName.JOB_LISTING} component={JobListingScreen} />
            <RootStack.Screen
              name={RouteName.JOB_DETAILS}
              options={{ gestureEnabled: false }}
              component={JobDetailScreen}
            />
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
