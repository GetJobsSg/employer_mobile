import React, { useState } from 'react';
import { Heading, Text, HStack, VStack } from 'native-base';
import { Scaffold, Tab } from 'src/components';

const tabOptions = [
  { id: 0, label: 'Applicants' },
  { id: 1, label: 'Offer Sent' },
  { id: 2, label: 'Accepted' },
];

const ParticipantListingScreen = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

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

      <VStack px={3} mt={4}>
        <Tab selected={selectedTab} options={tabOptions} onSelect={(option) => setSelectedTab(option)} />
        {/* <FlatList
          data={[]}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          //   ListFooterComponent={<Box pb={100} />}
          //   refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
        /> */}
      </VStack>
    </Scaffold>
  );
};

export default ParticipantListingScreen;
