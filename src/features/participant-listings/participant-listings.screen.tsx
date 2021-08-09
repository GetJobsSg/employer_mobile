import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Box, Heading, Text, HStack, VStack, Stack, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Tab } from 'src/components';
import { useAppDispatch } from 'src/hooks';
import { JobApplicationStatus } from 'src/constants/status';
import { useNavigation } from '@react-navigation/native';
import { CommonLayout } from 'src/constants/layout';
import ParticipantCard from './components/participants-card';
import { participantListingActions } from './slice';

const tabOptions = [
  { id: JobApplicationStatus.PENDING, label: 'Applicants' },
  { id: JobApplicationStatus.OFFERED, label: 'Offer Sent' },
  { id: JobApplicationStatus.ACCEPTED, label: 'Accepted' },
  { id: JobApplicationStatus.REJECTED, label: 'Rejected' },
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
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    switch (selectedTab.id) {
      case JobApplicationStatus.PENDING:
        dispatch(participantListingActions.getAllPendingParticipantRequest({ jobId: 17 }));
        break;

      case JobApplicationStatus.OFFERED:
        dispatch(participantListingActions.getAllOfferSentParticipantRequest({ jobId: 17 }));
        break;

      case JobApplicationStatus.REJECTED:
        dispatch(participantListingActions.getAllRejectedParticipantRequest({ jobId: 17 }));
        break;

      case JobApplicationStatus.ACCEPTED:
        dispatch(participantListingActions.getAllAcceptedParticipantRequest({ jobId: 17 }));
        break;

      default:
        break;
    }
  }, [dispatch, selectedTab]);

  const renderItem: ListRenderItem<{ id: number; name: string }> = () => (
    <Stack px={3} mb={4}>
      <ParticipantCard avatarUrl="" age={27} name="Benson Toh" gender="Male" ratings={4.6} />
    </Stack>
  );

  return (
    <>
      <Header
        title="Participants"
        iconLeft={
          <Icon as={Ionicons} name="chevron-back-outline" color="gray.600" onPress={() => navigation.goBack()} />
        }
      />

      <VStack bg="white">
        <HStack px={CommonLayout.containerX} py={2} justifyContent="space-between" alignItems="center">
          <VStack>
            <Heading size="sm">McDonald Delivery</Heading>
            <Heading size="sm" color="pink.600">
              $S12.00 / hour
            </Heading>
          </VStack>
          <Icon as={Ionicons} name="chevron-forward-circle-outline" size="sm" />
        </HStack>

        <VStack space={1} px={CommonLayout.containerX} py={2}>
          <HStack alignItems="center">
            <Icon mr={2} as={Ionicons} name="calendar-outline" size="sm" />
            <Text fontSize="sm" fontWeight="600">
              14 April 2021
            </Text>
          </HStack>

          <HStack alignItems="center">
            <Icon mr={2} as={Ionicons} name="time-outline" size="sm" />
            <Text fontSize="sm" fontWeight="600">
              08:00am - 10:00pm
            </Text>
          </HStack>
        </VStack>

        <VStack h="100%">
          <Stack px={CommonLayout.containerX - 1} py={2} pb={3}>
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
      </VStack>
    </>
  );
};

export default ParticipantListingScreen;
