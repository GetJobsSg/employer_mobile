import React from 'react';
import { Heading, Icon, VStack, HStack, Text, Divider } from 'native-base';
import { Alert, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { Header } from 'src/components';
import { CommonLayout } from 'src/constants/layout';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { RoleLevel } from 'src/constants/role';
import { authActions } from '../auth/slice';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const {
    email,
    firstName,
    lastName,
    company: { name: companyName },
    accessLevel: { id },
  } = useAppSelector((state) => state.auth.user);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Would you like to logout your account ?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: () => dispatch(authActions.logout()),
      },
    ]);
  };

  return (
    <VStack bg="white" flex={1}>
      <Header
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
        title="My Profile"
      />
      <VStack px={CommonLayout.containerX} py={CommonLayout.containerX}>
        <Heading size="lg">{`${firstName} ${lastName}`}</Heading>
        <Heading size="xs" fontWeight="400" color="gray.500">
          {email}
        </Heading>

        <VStack mt={3} space={1}>
          <HStack space={2}>
            <Icon as={Ionicons} name="people-circle-outline" color="gray.400" size="sm" />
            <Heading size="sm" fontWeight="400" color="gray.500">
              {id ? RoleLevel[id] : ''}
            </Heading>
          </HStack>

          <HStack space={2}>
            <Icon as={Ionicons} name="business-outline" color="gray.400" size={5} mr={1} />
            <Heading size="sm" fontWeight="400" color="gray.500">
              {companyName}
            </Heading>
          </HStack>
        </VStack>
      </VStack>

      <Divider />

      <VStack mt={4} px={CommonLayout.containerX}>
        <HStack my={2} alignItems="center">
          <Icon as={Ionicons} name="lock-closed-outline" size="md" mr={4} />
          <Text>Change Password (TODO)</Text>
        </HStack>

        <Pressable onPress={handleLogout}>
          <HStack my={2} alignItems="center">
            <Icon as={Ionicons} name="log-out-outline" size="md" mr={4} pl={0.5} />
            <Text>Logout</Text>
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default ProfileScreen;
