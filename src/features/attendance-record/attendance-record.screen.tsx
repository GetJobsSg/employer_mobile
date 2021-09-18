import React, { useEffect } from 'react';
import { Heading, Text, Icon, VStack, FlatList } from 'native-base';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, WorkerCard } from 'src/components';
import { ListRenderItem } from 'react-native';
import { constructJobDate } from 'src/utils/dateTime';
import { DD_MMM_YYYY } from 'src/constants/dateTime';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { IJobCompleted } from '../job-listings/slice/types';
import { attendanceRecordActions } from './slice';
import { IAttendanceRecord } from './slice/types';

const AttendanceRecordScreen = () => {
  const dispatch = useAppDispatch();
  const { attendanceRecords } = useAppSelector((state) => state.jobAttendaceRecord);

  const { params } = useRoute();
  const { id, startDate, endDate, startTime, endTime, title } = params as IJobCompleted;

  useEffect(() => {
    dispatch(attendanceRecordActions.getAttendanceRecordRequest({ jobId: id }));
  }, [dispatch, id]);

  const renderHeader = () => (
    <VStack px={4} py={4}>
      <Text fontSize="xs" color="gray.500">
        {`# ${id}`}
      </Text>
      <Heading size="sm">{title}</Heading>
      <VStack mt={1} space={1}>
        <Text color="orange.800" fontSize="sm" fontWeight="500">
          {constructJobDate(startDate, endDate, DD_MMM_YYYY)}
        </Text>
        {/* <Text color="orange.800">&bull;</Text> */}
        <Text color="orange.800" fontSize="sm" fontWeight="500">
          {`${startTime} - ${endTime}`}
        </Text>
      </VStack>
      <Text fontSize="sm" mt={2} color="gray.500">
        Tap on the worker below and start to give rating or amend their number of hours worked.
      </Text>
    </VStack>
  );

  // const renderListLoader = () => <Box mx={4} borderRadius={12} bgColor="gray.100" height={16} my={2} />;

  const renderList: ListRenderItem<IAttendanceRecord> = ({ item }) => (
    <WorkerCard
      avatar={item.profileImage}
      name={item.name}
      onCardClick={() => {}}
      clockInTime={item.clockInTime}
      clockOutTime={item.clockOutTime}
      age={item.age}
      ratings={item.ratings.toFixed(2)}
      normalHoursWorked={item.normalHoursWorked}
      otHoursWorked={item.otHoursWorked}
    />
  );

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Attendance Record"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => {}} />}
      />
      <FlatList
        data={attendanceRecords}
        renderItem={renderList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
      />
    </VStack>
  );
};

export default AttendanceRecordScreen;