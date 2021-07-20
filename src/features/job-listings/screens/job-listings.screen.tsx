import React, { useState } from 'react';
import { Heading, HStack, Stack, VStack } from 'native-base';
import { Scaffold, Tab } from 'src/components';
import ActiveList from '../components/active-list';
import OngoingList from '../components/ongoing-list';
import CompletedList from '../components/completed-list';
import CancelledList from '../components/cancelled-list';

const TabOptionList = [
  { id: 0, label: 'Active' },
  { id: 1, label: 'Ongoing' },
  { id: 2, label: 'Completed' },
  { id: 3, label: 'Cancelled' },
];

const JobListingScreen = () => {
  const [activeTab, setActiveTab] = useState(TabOptionList[0]);

  return (
    <Scaffold>
      <HStack px={4}>
        <Heading size="md">Listing</Heading>
      </HStack>

      <Stack px={4}>
        <Tab selected={activeTab} options={TabOptionList} onSelect={(option) => setActiveTab(option)} />
      </Stack>

      <VStack h="100%">
        {activeTab.id === 0 && <ActiveList />}
        {activeTab.id === 1 && <OngoingList />}
        {activeTab.id === 2 && <CompletedList />}
        {activeTab.id === 3 && <CancelledList />}
      </VStack>
    </Scaffold>
  );
};

export default JobListingScreen;
