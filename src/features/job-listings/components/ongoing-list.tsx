import React, { useEffect } from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Box, Spinner, Pressable, Text, Badge, Row } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { JobStatus } from 'src/constants/status';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteName } from 'src/navigator/route';
import { RootStackParams } from 'src/navigator/types';
import { jobListingActions } from '../slice';
import { IJobOngoing } from '../slice/types';

const OngoingList = () => {
  const dispatch = useAppDispatch();
  const { isLoadingOngoingJobs, onGoingJobs } = useAppSelector((state) => state.jobListings);
  const navigation = useNavigation<NavigationProp<RootStackParams, RouteName.ATTENDANCE_RECORD>>();

  useEffect(() => {
    dispatch(jobListingActions.getOngoingJobListRequest(JobStatus.ONGOING));
  }, [dispatch]);

  const renderItem: ListRenderItem<IJobOngoing> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate(RouteName.ATTENDANCE_RECORD, { jobData: item, jobStatus: 'ongoing' })}
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
      <Row mt={2} space={2}>
        <Badge borderRadius={10} px={2} py={1} colorScheme="success">
          {`Workers - ${item.totalAcceptedCount}`}
        </Badge>
      </Row>
    </Pressable>
  );

  if (isLoadingOngoingJobs) {
    return (
      <Box my={4}>
        <Spinner size="sm" />
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
