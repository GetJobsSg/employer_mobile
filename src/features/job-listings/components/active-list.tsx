import React, { useCallback, useEffect } from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Box, Spinner, Pressable, Text } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from 'src/navigator/route';
import { jobListingActions } from '../slice';
import { IJobActive } from '../slice/types';

const ActiveList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isLoadingActiveJobs, activeJobs } = useAppSelector((state) => state.jobListings);

  const fetchActiveList = useCallback(() => {
    dispatch(jobListingActions.getActiveJobListRequest(JobStatus.OPEN));
  }, [dispatch]);

  useEffect(() => {
    fetchActiveList();
  }, [fetchActiveList]);

  const renderItem: ListRenderItem<IJobActive> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate(RouteName.PARTICIPANTS_LISTING, item)}
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

  if (isLoadingActiveJobs) {
    return (
      <Box my={4}>
        <Spinner />
      </Box>
    );
  }

  if (activeJobs.length === 0) {
    return (
      <Box px={4} py={2}>
        <Text fontWeight="bold" color="gray.400">
          You have no active jobs
        </Text>
      </Box>
    );
  }

  return (
    <FlatList
      data={activeJobs}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={<Box pb={100} />}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => fetchActiveList()} />}
    />
  );
};

export default ActiveList;
