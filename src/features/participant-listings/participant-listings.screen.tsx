import React, { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Box, Heading, Text, HStack, VStack, Stack } from 'native-base';
import { Scaffold, Tab } from 'src/components';
import ParticipantCard from './components/participants-card';

const tabOptions = [
  { id: 0, label: 'Applicants' },
  { id: 1, label: 'Offer Sent' },
  { id: 2, label: 'Accepted' },
];

const dummyData = [
  { id: 1, name: 'benson' },
  { id: 2, name: 'benson' },
  { id: 3, name: 'benson' },
  { id: 4, name: 'benson' },
  { id: 5, name: 'benson' },
  { id: 6, name: 'benson' },
  { id: 7, name: 'benson' },
  { id: 8, name: 'benson' },
  { id: 9, name: 'benson' },
];

const ParticipantListingScreen = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

  const renderItem: ListRenderItem<{ id: number; name: string }> = () => (
    <Stack px={3} mb={4}>
      <ParticipantCard avatarUrl="" age={27} name="Benson Toh" gender="Male" ratings={4.6} />
    </Stack>
  );

  return (
    <Scaffold>
      <VStack px={4}>
        <Heading size="sm">McDonald Delivery</Heading>
        <Heading size="sm" color="pink.600">
          $S12.00 / hour
        </Heading>
      </VStack>

      <VStack px={4} mt={4}>
        <HStack>
          <Text>0</Text>
          <Text>14 April 2021</Text>
        </HStack>

        <HStack alignItems="center">
          <Text fontSize="sm" fontWeight="600" mr={2}>
            00
          </Text>
          <Text fontSize="sm" fontWeight="600">
            14 April 2021
          </Text>
        </HStack>
      </VStack>

      <VStack h="100%">
        <Stack px={3} py={4}>
          <Tab selected={selectedTab} options={tabOptions} onSelect={(option) => setSelectedTab(option)} />
        </Stack>

        <FlatList
          data={dummyData}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListFooterComponent={<Box pb={100} />}
          //   refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
        />
      </VStack>
    </Scaffold>
  );
};

export default ParticipantListingScreen;
