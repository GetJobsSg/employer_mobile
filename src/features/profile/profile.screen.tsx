import React from 'react';
import { Icon, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'src/components';

const ProfileScreen = () => (
  <VStack bg="white" flex={1}>
    <Header iconLeft={<Icon as={Ionicons} name="chevron-back-outline" />} title="My Profile" />
  </VStack>
);

export default ProfileScreen;
