import React, { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Box, Icon, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'src/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from 'src/hooks';
import WorkerCard from './components/worker-card';
import { workerListingActions } from './slice';
import { IJobOngoing } from '../job-listings/slice/types';

const WorkerListingScreen = () => {
  const dispatch = useAppDispatch();
  // const {} = useAppSelector((state) => state.workerListings);

  const navigation = useNavigation();
  const { params } = useRoute();
  const { id } = params as IJobOngoing;

  console.log('params>>>', params);

  useEffect(() => {
    dispatch(workerListingActions.getAllWorkerRequest({ jobId: id }));
  }, [dispatch, id]);

  const renderItem = () => (
    <WorkerCard
      avatar={undefined}
      name="Benson Toh"
      onCardClick={() => {}}
      clockInTime="08:23"
      clockOutTime={null}
      age={23}
      ratings={3.4}
    />
  );

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Attendees"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        ListFooterComponent={<Box pb={100} />}
        ItemSeparatorComponent={() => <Box py={2} />}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      />
    </VStack>
  );
};

export default WorkerListingScreen;
