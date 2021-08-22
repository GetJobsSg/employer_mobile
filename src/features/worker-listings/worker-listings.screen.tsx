import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ListRenderItem } from 'react-native';
import { Box, Icon, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'src/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import WorkerCard from './components/worker-card';
import TimeClockModal from './components/timeclock-modal';
import { workerListingActions } from './slice';
import { IJobOngoing } from '../job-listings/slice/types';

import { IWorker } from './slice/types';

const WorkerListingScreen = () => {
  const dispatch = useAppDispatch();
  const { allWorkers } = useAppSelector((state) => state.workerListings);

  const navigation = useNavigation();
  const { params } = useRoute();
  const { id } = params as IJobOngoing;

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('params>>>', params);

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
      ratings={item.ratings}
    />
  );

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Attendees"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />
      <FlatList
        data={allWorkers}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={<Box pb={100} />}
        ItemSeparatorComponent={() => <Box py={2} />}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      />
      <TimeClockModal visible={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </VStack>
  );
};

export default WorkerListingScreen;
