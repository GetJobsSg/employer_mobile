import React, { useEffect, useState } from 'react';
import { Alert, ListRenderItem, Linking } from 'react-native';
import { Heading, Text, HStack, VStack, Stack, Icon, FlatList, Box, Spinner } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Tab } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobApplicationStatus } from 'src/constants/status';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CommonLayout } from 'src/constants/layout';
import { constructJobDate } from 'src/utils/dateTime';
import { DD_MMM_YYYY } from 'src/constants/dateTime';
import { isAndroid } from 'src/utils/platform';

import ParticipantCard from './components/participants-card';
import { participantListingActions } from './slice';
import { IJobCommon } from '../job-listings/slice/types';
import { IParticipant } from './slice/types';

const tabOptions = [
  { id: JobApplicationStatus.PENDING, label: 'Applicants' },
  { id: JobApplicationStatus.OFFERED, label: 'Offer Sent' },
  { id: JobApplicationStatus.ACCEPTED, label: 'Accepted' },
  { id: JobApplicationStatus.REJECTED, label: 'Rejected' },
];

const ParticipantListingScreen = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

  const {
    isLoadingGetAllPendingParticipant,
    pendingParticipants,

    isLoadingGetAllOfferSentPartcipant,
    offerSentParticipants,

    isLoadingGetAllRejectedPartcipant,
    rejectedParticipants,

    isLoadingGetAllAcceptedPartcipant,
    acceptedParticipants,
  } = useAppSelector((state) => state.participantListings);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { params } = useRoute();
  const { id, title, hourlyRate, startDate, endDate, startTime, endTime } = params as IJobCommon;
  const jobId = id as number;

  useEffect(() => {
    switch (selectedTab.id) {
      case JobApplicationStatus.PENDING:
        dispatch(participantListingActions.getAllPendingParticipantRequest({ jobId }));
        break;

      case JobApplicationStatus.OFFERED:
        dispatch(participantListingActions.getAllOfferSentParticipantRequest({ jobId }));
        break;

      case JobApplicationStatus.REJECTED:
        dispatch(participantListingActions.getAllRejectedParticipantRequest({ jobId }));
        break;

      case JobApplicationStatus.ACCEPTED:
        dispatch(participantListingActions.getAllAcceptedParticipantRequest({ jobId }));
        break;

      default:
        break;
    }
  }, [dispatch, jobId, selectedTab]);

  const getListData = () => {
    switch (selectedTab.id) {
      case JobApplicationStatus.PENDING:
        return pendingParticipants;

      case JobApplicationStatus.OFFERED:
        return offerSentParticipants;

      case JobApplicationStatus.REJECTED:
        return rejectedParticipants;

      case JobApplicationStatus.ACCEPTED:
        return acceptedParticipants;

      default:
        return [];
    }
  };

  const handleSendOffer = (_jobId: number, _jobseekerId: number) => () => {
    dispatch(participantListingActions.sendOfferParticipantRequest({ jobId: _jobId, jobseekerId: _jobseekerId }));
  };

  const handleReject = (_jobId: number, _jobseekerId: number) => () => {
    Alert.alert('Reject Applicant', 'Would you like to reject this applicant?', [
      { text: 'Cancel' },
      {
        text: 'Reject',
        onPress: () => {
          dispatch(
            participantListingActions.rejectOfferParticipantRequest({ jobId: _jobId, jobseekerId: _jobseekerId }),
          );
        },
      },
    ]);
  };

  const handlePhoneCall = (phoneNumber: string) => () => {
    if (!phoneNumber) return;
    if (isAndroid) Linking.openURL(`tel:${phoneNumber}`);
    else Linking.openURL(`telprompt:${phoneNumber}`);
  };

  const handleWhatsapp = (phoneNumber: string) => () => {
    if (!phoneNumber) return;
    const url = `whatsapp://send?phone=65${phoneNumber}`;
    Linking.openURL(url)
      .then(() => console.log('whatsapp opened'))
      .catch(() => Alert.alert('Whatsapp is not installed on your device.'));
  };

  const renderItem: ListRenderItem<IParticipant> = ({ item }) => {
    const { age, name, gender, profileImage, ratings, isSendingOffer, isRejecting } = item;

    // Applicant Tab - allow send offer and reject participant
    if (selectedTab.id === JobApplicationStatus.PENDING) {
      return (
        <ParticipantCard
          avatarUrl={profileImage}
          age={age}
          name={name}
          gender={gender}
          ratings={ratings}
          isSendingOffer={isSendingOffer}
          onSendOffer={handleSendOffer(id, item.id)}
          isRejecting={isRejecting}
          onReject={handleReject(id, item.id)}
        />
      );
    }

    // Accepted Tab - allow allow call or message participant
    if (selectedTab.id === JobApplicationStatus.ACCEPTED) {
      return (
        <ParticipantCard
          avatarUrl={profileImage}
          age={age}
          name={name}
          gender={gender}
          ratings={ratings}
          onPhoneCall={handlePhoneCall(item.mobile)}
          onWhatsapp={handleWhatsapp(item.mobile)}
        />
      );
    }

    // Default - render participant card without any CTA button
    return <ParticipantCard avatarUrl={profileImage} age={age} name={name} gender={gender} ratings={ratings} />;
  };

  const renderContent = () => {
    if (
      isLoadingGetAllAcceptedPartcipant ||
      isLoadingGetAllOfferSentPartcipant ||
      isLoadingGetAllPendingParticipant ||
      isLoadingGetAllRejectedPartcipant
    ) {
      return (
        <Box flex={1}>
          <Spinner />
        </Box>
      );
    }

    if (!getListData().length) {
      return (
        <VStack px={4} py={4}>
          <Text textAlign="center" fontSize="lg" fontWeight="500" color="gray.400">
            No Result
          </Text>
        </VStack>
      );
    }

    return (
      <FlatList
        contentContainerStyle={{ paddingTop: 10 }}
        data={getListData()}
        extraData={selectedTab} // re-render list when tab changed
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListFooterComponent={<Box pb={400} />}
      />
    );
  };

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
            <Text fontSize="xs" color="gray.500">
              {`# ${id}`}
            </Text>
            <Heading size="sm">{title}</Heading>
            <Heading size="sm" color="pink.600">
              {`$${hourlyRate.toFixed(2)} / hour`}
            </Heading>
          </VStack>
          <Icon as={Ionicons} name="chevron-forward-circle-outline" size="sm" />
        </HStack>

        <VStack space={1} px={CommonLayout.containerX} py={2}>
          <HStack alignItems="center">
            <Icon mr={2} as={Ionicons} name="calendar-outline" size="sm" />
            <Text fontSize="sm" fontWeight="600">
              {constructJobDate(startDate, endDate, DD_MMM_YYYY)}
            </Text>
          </HStack>

          <HStack alignItems="center">
            <Icon mr={2} as={Ionicons} name="time-outline" size="sm" />
            <Text fontSize="sm" fontWeight="600">
              {`${startTime} - ${endTime}`}
            </Text>
          </HStack>
        </VStack>

        <VStack h="100%">
          <Stack px={CommonLayout.containerX - 1} py={2} pb={3}>
            <Tab selected={selectedTab} options={tabOptions} onSelect={(option) => setSelectedTab(option)} />
          </Stack>
          {renderContent()}
        </VStack>
      </VStack>
    </>
  );
};

export default ParticipantListingScreen;
