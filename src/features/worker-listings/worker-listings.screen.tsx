import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ListRenderItem } from 'react-native';
import { Box, Text, Icon, Spinner, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, JobMainInfo } from 'src/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { constructJobDate } from 'src/utils/dateTime';
import { DD_MMM_YYYY } from 'src/constants/dateTime';
import WorkerCard from './components/worker-card';
import TimeClockModal from './components/timeclock-modal';
import { workerListingActions } from './slice';
import { IJobOngoing } from '../job-listings/slice/types';

import { IWorker } from './slice/types';

const WorkerListingScreen = () => {
  const dispatch = useAppDispatch();
  const { allWorkers, isLoadingAllWorkers } = useAppSelector((state) => state.workerListings);

  const navigation = useNavigation();
  const { params } = useRoute();
  const { id, title, hourlyRate, startDate, endDate, startTime, endTime, startCode, endCode } = params as IJobOngoing;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(workerListingActions.getAllWorkerRequest({ jobId: id }));
  }, [dispatch, id]);

  const renderItem: ListRenderItem<IWorker> = ({ item }) => (
    <WorkerCard
      avatar={item.profileImage}
      name={item.name}
      onCardClick={() => {}}
      clockInTime={item.clockInTime}
      clockOutTime={item.clockOutTime}
      age={item.age}
      ratings={item.ratings.toFixed(2)}
    />
  );

  const renderContentList = () => {
    if (isLoadingAllWorkers) {
      return (
        <Box flex={1}>
          <Spinner />
        </Box>
      );
    }

    if (allWorkers.length === 0) {
      return (
        <Box px={4} py={2}>
          <Text fontWeight="bold" color="gray.400">
            There is no worker involved in this job.
          </Text>
        </Box>
      );
    }

    return (
      <FlatList
        data={allWorkers}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={<Box pb={100} />}
        ItemSeparatorComponent={() => <Box py={2} />}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      />
    );
  };

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="All Workers"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />

      <JobMainInfo
        id={id}
        title={title}
        hourlyRate={hourlyRate}
        date={constructJobDate(startDate, endDate, DD_MMM_YYYY)}
        time={`${startTime} - ${endTime}`}
        startCode={startCode}
        endCode={endCode}
      />

      {renderContentList()}

      <TimeClockModal visible={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </VStack>
  );
};

export default WorkerListingScreen;
