import React from 'react';
import { Heading, Icon, VStack, HStack, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'src/components';
import { useNavigation } from '@react-navigation/native';
import { CommonLayout } from 'src/constants/layout';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack bg="white" flex={1}>
      <Header
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
        title="My Profile"
      />
      <VStack px={CommonLayout.containerX} py={CommonLayout.containerX}>
        <Heading size="lg">Benson Toh Ban Soon</Heading>
        <Heading size="sm" fontWeight="400" color="gray.500">
          benson@gmail.com
        </Heading>

        <VStack mt={4} space={2}>
          <HStack space={4} alignItems="center">
            <Icon as={Ionicons} name="people-circle-outline" size="md" />
            <Text>Admin</Text>
          </HStack>
          <HStack space={4} alignItems="center">
            <Icon as={Ionicons} name="business-outline" size="sm" ml={1} mr={1} />
            <Text>McDonald Singapore Pte Ltd</Text>
          </HStack>
        </VStack>
      </VStack>

      <VStack mt={4} px={CommonLayout.containerX}>
        <HStack my={2} alignItems="center">
          <Icon as={Ionicons} name="lock-closed-outline" size="md" mr={4} />
          <Text>Change Password</Text>
        </HStack>

        <HStack my={2} alignItems="center">
          <Icon as={Ionicons} name="log-out-outline" size="md" mr={4} pl={0.5} />
          <Text>Logout</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProfileScreen;
