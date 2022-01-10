import React, { useState } from 'react';
import { Heading, HStack, VStack, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Tab } from 'src/components';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from 'src/navigator/route';
import { ActiveList, OngoingList, CompletedList, CancelledList } from './components';

enum ListingTab {
  ACTIVE_JOB,
  ONGOING_JOB,
  COMPLETED_JOB,
  CANCELLED_JOB,
}

const TabOptionList = [
  { id: ListingTab.ACTIVE_JOB, label: 'Active' },
  { id: ListingTab.ONGOING_JOB, label: 'Ongoing' },
  { id: ListingTab.COMPLETED_JOB, label: 'Completed' },
  { id: ListingTab.CANCELLED_JOB, label: 'Cancelled' },
];

const JobListingScreen = () => {
  const [activeTab, setActiveTab] = useState(TabOptionList[0]);
  const navigation = useNavigation();

  const handleCreate = () => {
    navigation.navigate(RouteName.JOB_DETAILS, { mode: 'create' });
  };

  return (
    <VStack bg="white" flex={1}>
      <Header>
        <VStack px={4} py={2}>
          <HStack mb={2} justifyContent="space-between" alignItems="center">
            <Heading size="md" color="black">
              Listing
            </Heading>
            <HStack space={4}>
              <Icon onPress={handleCreate} as={Ionicons} name="add-circle-outline" />
              <Icon onPress={() => navigation.navigate(RouteName.PROFILE)} as={Ionicons} name="person-circle-outline" />
            </HStack>
          </HStack>
          <Tab selected={activeTab} options={TabOptionList} onSelect={(option) => setActiveTab(option)} />
        </VStack>
      </Header>

      <VStack flex={1}>
        {activeTab.id === 0 && <ActiveList />}
        {activeTab.id === 1 && <OngoingList />}
        {activeTab.id === 2 && <CompletedList />}
        {activeTab.id === 3 && <CancelledList />}
      </VStack>
    </VStack>
  );
};

export default JobListingScreen;
