import React, { useEffect } from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Badge, Box, Row, Spinner, Text } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import { jobListingActions } from '../slice';
import { IJobCancelled } from '../slice/types';

const CancelledList = () => {
  const dispatch = useAppDispatch();
  const { isLoadingCancelledJobs, cancelledJobs } = useAppSelector((state) => state.jobListings);

  useEffect(() => {
    dispatch(jobListingActions.getCancelledJobListRequest(JobStatus.CANCELLED));
  }, [dispatch]);

  const renderItem: ListRenderItem<IJobCancelled> = ({ item }) => (
    <Box bg="gray.50" borderRadius={5} my={1} mx={4} p={4}>
      <Text fontSize="sm" fontWeight="bold">
        {item.title}
      </Text>
      <Text fontSize="sm">14 June 2021 (Sat)</Text>
      <Text fontSize="sm">07:00am - 10:00am</Text>
      <Row mt={2} space={2}>
        <Badge
          borderRadius={10}
          px={2}
          py={1}
          colorScheme={item.totalAcceptedCount >= item.vacancy ? 'success' : 'coolGray'}
        >
          {`Filled - ${item.totalAcceptedCount}/${item.vacancy}`}
        </Badge>
      </Row>
    </Box>
  );

  if (isLoadingCancelledJobs) {
    return (
      <Box my={4}>
        <Spinner size="sm" />
      </Box>
    );
  }

  return (
    <FlatList
      data={cancelledJobs}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={<Box pb={100} />}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
    />
  );
};

export default CancelledList;
