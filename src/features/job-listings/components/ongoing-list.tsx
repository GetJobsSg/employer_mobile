import React, { useEffect } from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Box, Spinner, Pressable, Text } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from 'src/navigator/route';
import { jobListingActions } from '../slice';
import { IJobOngoing } from '../slice/types';

const OngoingList = () => {
  const dispatch = useAppDispatch();
  const { isLoadingOngoingJobs, onGoingJobs } = useAppSelector((state) => state.jobListings);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(jobListingActions.getOngoingJobListRequest(JobStatus.ONGOING));
  }, [dispatch]);

  const renderItem: ListRenderItem<IJobOngoing> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate(RouteName.ATTENDANCE_RECORD, item)}
      bg="gray.50"
      borderRadius={5}
      my={1}
      mx={4}
      p={4}
    >
      <Text fontSize="sm" fontWeight="bold">
        {item.title}
      </Text>
      <Text fontSize="sm">{item.formattedDate}</Text>
      <Text fontSize="sm">{`${item.startTime} - ${item.endTime}`}</Text>
    </Pressable>
  );

  if (isLoadingOngoingJobs) {
    return (
      <Box my={4}>
        <Spinner />
      </Box>
    );
  }

  if (onGoingJobs.length === 0) {
    return (
      <Box px={4} py={2}>
        <Text fontWeight="bold" color="gray.400">
          You have no on-going jobs
        </Text>
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
