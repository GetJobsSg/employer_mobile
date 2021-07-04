import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from 'src/features/auth';
import { MyJobListingScreen } from 'src/features/my-job-listing';
import { useAppSelector } from 'src/hooks';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!isAuthenticated ? (
          <RootStack.Screen name="authentication" options={{ headerShown: false }} component={LoginScreen} />
        ) : (
          <RootStack.Screen name="main" component={MyJobListingScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
