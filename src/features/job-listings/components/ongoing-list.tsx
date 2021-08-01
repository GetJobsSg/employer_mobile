import React, { useEffect } from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Box, Spinner, Text } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import { jobListingActions } from '../slice';
import { IJobActive } from '../slice/types';

const OngoingList = () => {
  const dispatch = useAppDispatch();
  const { isLoadingOngoingJobs, onGoingJobs } = useAppSelector((state) => state.jobListings);

  useEffect(() => {
    dispatch(jobListingActions.getOngoingJobListRequest(JobStatus.ONGOING));
  }, [dispatch]);

  const renderItem: ListRenderItem<IJobActive> = ({ item }) => (
    <Box bg="gray.50" borderRadius={5} my={1} mx={4} p={4}>
      <Text fontSize="sm" fontWeight="bold">
        {item.title}
      </Text>
      <Text fontSize="sm">14 June 2021 (Sat)</Text>
      <Text fontSize="sm">07:00am - 10:00am</Text>
    </Box>
  );

  if (isLoadingOngoingJobs) {
    return (
      <Box my={4}>
        <Spinner />
      </Box>
    );
  }

  return (
    <FlatList
      data={onGoingJobs}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={<Box pb={100} />}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
    />
  );
};

export default OngoingList;
