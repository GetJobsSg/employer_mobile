import React, { useState, useEffect } from 'react';
import { Heading, HStack, VStack } from 'native-base';
import { Scaffold, Tab } from 'src/components';
import { useAppDispatch } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import ActiveList from '../components/active-list';
import { jobListingActions } from '../slice';

const TabOptionList = [
  { id: 0, label: 'Active' },
  { id: 1, label: 'Ongoing' },
  { id: 2, label: 'Completed' },
];

const JobListingScreen = () => {
  const [activeTab, setActiveTab] = useState(TabOptionList[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(jobListingActions.getActiveJobListRequest(JobStatus.OPEN));
  });

  return (
    <Scaffold>
      <HStack px={4}>
        <Heading size="md">Listing</Heading>
      </HStack>

      <Tab selected={activeTab} options={TabOptionList} onSelect={(option) => setActiveTab(option)} />

      <VStack h="100%">{activeTab.id === 0 && <ActiveList />}</VStack>
    </Scaffold>
  );
};

export default JobListingScreen;
