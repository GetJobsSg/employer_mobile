import React, { useMemo } from 'react';
import { Box, Heading, Icon, VStack, HStack, Text, Stack } from 'native-base';
import { Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { Header } from 'src/components';
import { CommonLayout } from 'src/constants/layout';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { RoleLevel } from 'src/constants/role';
import { RouteName } from 'src/navigator/route';
import { authActions } from '../auth/slice';

const CTAItem = (props: { label: string; onAction: () => void }) => {
  const { label, onAction } = props;
  return (
    <TouchableOpacity onPress={onAction}>
      <HStack py={4} alignItems="center" justifyContent="space-between" borderBottomWidth={0.5} borderColor="gray.200">
        <Text color="gray.600" fontWeight="300" fontSize="sm">
          {label}
        </Text>
        <Icon color="gray.400" as={Ionicons} name="chevron-forward-outline" size={5} />
      </HStack>
    </TouchableOpacity>
  );
};

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
    Alert.alert('Logout', 'Are you sure would like to logout your account?', [
      { text: 'No' },
      {
        text: 'Yes',
        onPress: () => dispatch(authActions.logout()),
      },
    ]);
  };

  const username = useMemo(() => `${firstName} ${lastName}`.toUpperCase(), [firstName, lastName]);

  return (
    <VStack bg="white" flex={1}>
      <Header
        iconLeft={
          <Icon
            as={Ionicons}
            size={6}
            name="chevron-back-outline"
            color="gray.500"
            onPress={() => navigation.goBack()}
          />
        }
        title="Profile"
      />

      <Stack px={CommonLayout.containerX} pt={4}>
        <Box p={4} borderRadius={4} shadow={1} backgroundColor="white">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Heading size="md" color="gray.600">
                {username}
              </Heading>
              <Heading size="sm" fontWeight="400" color="gray.600">
                {email}
              </Heading>
            </VStack>
            {/* <Icon as={Ionicons} name="arrow-forward-outline" size={5} color="gray.500" /> */}
          </HStack>

          <Heading size="xs" mt={1} fontWeight="300" color="gray.600">
            {id ? RoleLevel[id] : ''}
          </Heading>
          <Heading size="xs" fontWeight="300" color="gray.600">
            {companyName}
          </Heading>
        </Box>
      </Stack>

      <VStack px={CommonLayout.containerX} pt={2} pb={4}>
        <CTAItem label="Change Password" onAction={() => navigation.navigate(RouteName.AUTH_CHANGE_PASSWORD)} />
        <CTAItem label="Payment Method" onAction={() => navigation.navigate(RouteName.PAYMENT_METHODS)} />
        <CTAItem label="Billing Address" onAction={() => navigation.navigate(RouteName.BILLING_ADDRESS)} />
        <CTAItem label="Terms of Use" onAction={() => navigation.navigate(RouteName.TERMS_OF_USE)} />
        <CTAItem label="Privacy Policy" onAction={() => navigation.navigate(RouteName.PRIVACY_POLICY)} />
        <CTAItem label="Logout" onAction={handleLogout} />
      </VStack>
    </VStack>
  );
};

export default ProfileScreen;
