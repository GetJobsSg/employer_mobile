import React, { useEffect } from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Box, Spinner, Text } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import { jobListingActions } from '../../slice';
import { IJobActive } from '../../slice/types';

const ActiveList = () => {
  const dispatch = useAppDispatch();
  const { isLoadingActiveJobs, activeJobs } = useAppSelector((state) => state.jobListings);

  useEffect(() => {
    dispatch(jobListingActions.getActiveJobListRequest(JobStatus.OPEN));
  }, [dispatch]);

  const renderItem: ListRenderItem<IJobActive> = ({ item }) => (
    <Box bg="gray.50" borderRadius={5} my={1} mx={4} p={4}>
      <Text fontSize="sm" fontWeight="bold">
        {item.title}
      </Text>
      <Text fontSize="sm">{item.formattedDate}</Text>
      <Text fontSize="sm">{`${item.startTime} - ${item.endTime}`}</Text>
    </Box>
  );

  if (isLoadingActiveJobs) {
    return (
      <Box my={4}>
        <Spinner />;
      </Box>
    );
  }

  return (
    <FlatList
      data={activeJobs}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={<Box pb={100} />}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
    />
  );
};

export default ActiveList;
