import React, { useEffect, useState } from 'react';
import { Heading, Text, Icon, VStack, FlatList, Spinner } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, WorkerCard } from 'src/components';
import { ListRenderItem } from 'react-native';
import { constructJobDate } from 'src/utils/dateTime';
import { DD_MMM_YYYY } from 'src/constants/dateTime';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { IJobCompleted } from '../job-listings/slice/types';
import { attendanceRecordActions } from './slice';
import { IAttendanceRecord } from './slice/types';
import AttendanceModal from './components/attendance-modal';

const AttendanceRecordScreen = () => {
  const dispatch = useAppDispatch();
  const { isLoadingAttendanceRecords, attendanceRecords, isLoadingUpdateWorkingData, errorUpdateWorkingData } =
    useAppSelector((state) => state.jobAttendaceRecord);

  const navigation = useNavigation();
  const { params } = useRoute();
  const { id, startDate, endDate, startTime, endTime, title } = params as IJobCompleted;

  const [attendanceModalData, setAttendanceModalData] = useState<IAttendanceRecord>();
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);

  // fetch attendance record when screen mounted
  useEffect(() => {
    dispatch(attendanceRecordActions.getAttendanceRecordRequest({ jobId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (!isLoadingUpdateWorkingData && !errorUpdateWorkingData) {
      setAttendanceModalOpen(false);
      setAttendanceModalData(undefined);
    }
  }, [isLoadingUpdateWorkingData, errorUpdateWorkingData]);

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
        <Text color="orange.800" fontSize="sm" fontWeight="500">
          {`${startTime} - ${endTime}`}
        </Text>
      </VStack>
      <Text fontSize="sm" mt={2} color="gray.500">
        Tap on the worker to give rating and amend their number of hours worked.
      </Text>
    </VStack>
  );

  const renderList: ListRenderItem<IAttendanceRecord> = ({ item }) => (
    <WorkerCard
      avatar={item.profileImage}
      name={item.name}
      onCardClick={() => {
        setAttendanceModalData(item);
        setAttendanceModalOpen(true);
      }}
      clockInTime={item.clockInTime}
      clockOutTime={item.clockOutTime}
      age={item.age}
      ratings={item.ratings.toFixed(2)}
      showWorkHours
      normalHoursWorked={item.normalHoursWorked}
      otHoursWorked={item.otHoursWorked}
    />
  );

  const renderContent = () => {
    if (isLoadingAttendanceRecords) {
      return <Spinner size="sm" />;
    }

    if (attendanceRecords.length === 0) {
      return (
        <VStack px={4} py={4}>
          <Text textAlign="center" fontSize="lg" fontWeight="500" color="gray.400">
            No Result
          </Text>
        </VStack>
      );
    }

    return <FlatList data={attendanceRecords} renderItem={renderList} keyExtractor={(item) => item.id} />;
  };

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Attendance Record"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
      />
      {renderHeader()}
      {renderContent()}
      {attendanceModalData && attendanceModalOpen && (
        <AttendanceModal
          attendanceData={attendanceModalData as IAttendanceRecord}
          visible={attendanceModalOpen}
          isLoadingUpdate={isLoadingUpdateWorkingData}
          onClose={() => setAttendanceModalOpen(false)}
          onOK={(data) => {
            dispatch(
              attendanceRecordActions.adjustWorkingDataRequest({
                jobId: id,
                ...data,
              }),
            );
          }}
        />
      )}
    </VStack>
  );
};

export default AttendanceRecordScreen;
