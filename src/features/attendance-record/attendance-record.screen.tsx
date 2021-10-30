import React, { useEffect, useState } from 'react';
import { Icon, VStack, FlatList, Spinner, Stack, Text, HStack } from 'native-base';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Banner, Header, WorkerCard, JobMainInfo, Tab } from 'src/components';
import { ListRenderItem } from 'react-native';
import { constructJobDate } from 'src/utils/dateTime';
import { DD_MMM_YYYY } from 'src/constants/dateTime';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { RootStackParams } from 'src/navigator/types';
import { RouteName } from 'src/navigator/route';
import { attendanceRecordActions } from './slice';
import { IAttendanceRecord } from './slice/types';
import AttendanceModal from './components/attendance-modal';

// For OnGoing Job
const tabOptionOngoing = [{ id: 1, label: 'Attendance Record' }];

// For Completed Job
const tabOptionCompleted = [
  { id: 0, label: 'Billing Info' },
  { id: 1, label: 'Attendance Record' },
];

const AttendanceRecordScreen = () => {
  const dispatch = useAppDispatch();
  const {
    isLoadingAttendanceRecords,
    isLoadingGetBillingInfo,
    attendanceRecords,
    billingInfo,
    isLoadingUpdateWorkingData,
    errorUpdateWorkingData,
  } = useAppSelector((state) => state.jobAttendaceRecord);

  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParams, RouteName.ATTENDANCE_RECORD>>();
  const { jobData, jobStatus } = params;
  const { id, startDate, endDate, startTime, endTime, title, startCode, endCode, hourlyRate } = jobData;

  const tabOptions = jobStatus === 'ongoing' ? tabOptionOngoing : tabOptionCompleted;

  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);
  const [attendanceModalData, setAttendanceModalData] = useState<IAttendanceRecord>();
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);

  // fetch attendance record
  useEffect(() => {
    dispatch(attendanceRecordActions.getAttendanceRecordRequest({ jobId: id }));
  }, [dispatch, id]);

  // fetch billingInfo if it is completed job
  useEffect(() => {
    if (jobStatus === 'completed') {
      dispatch(attendanceRecordActions.getBillingInfoRequest({ jobId: id }));
    }
  }, [dispatch, id, jobStatus]);

  useEffect(() => {
    if (!isLoadingUpdateWorkingData && !errorUpdateWorkingData) {
      setAttendanceModalOpen(false);
      setAttendanceModalData(undefined);
    }
  }, [isLoadingUpdateWorkingData, errorUpdateWorkingData]);

  const renderJobInfo = () => (
    <JobMainInfo
      id={id}
      title={title}
      hourlyRate={hourlyRate}
      date={constructJobDate(startDate, endDate, DD_MMM_YYYY)}
      time={`${startTime} - ${endTime}`}
      startCode={startCode}
      endCode={endCode}
    />
  );

  const renderList: ListRenderItem<IAttendanceRecord> = ({ item }) => (
    <WorkerCard
      avatar={item.profileImage}
      name={item.name}
      onCardClick={() => {
        // only ongoing job can ammend work hour record
        if (jobStatus === 'ongoing') {
          setAttendanceModalData(item);
          setAttendanceModalOpen(true);
        }
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

  const renderBillingInfo = () => {
    if (isLoadingGetBillingInfo) return <Spinner size="sm" />;
    return (
      <Banner>
        <VStack space={3}>
          <HStack justifyContent="space-between">
            <Text fontSize="sm">Total Amount</Text>
            <Text fontWeight="bold">{`$ ${billingInfo?.billAmount?.toFixed(2)}`}</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text fontSize="sm">Paid</Text>
            <Text fontWeight="bold">{billingInfo?.paid ? 'Yes' : 'No'}</Text>
          </HStack>
        </VStack>
      </Banner>
    );
  };

  const renderAttendanceData = () => {
    if (isLoadingAttendanceRecords) return <Spinner size="sm" />;
    if (attendanceRecords.length === 0) return <Banner message="You do not have any workers" />;
    return <FlatList data={attendanceRecords} renderItem={renderList} keyExtractor={(item) => item.id} />;
  };

  const renderTab = () => (
    <Stack px={3} py={4}>
      <Tab align="stick" selected={selectedTab} options={tabOptions} onSelect={(option) => setSelectedTab(option)} />
    </Stack>
  );

  const renderModal = () => {
    if (attendanceModalData && attendanceModalOpen) {
      return (
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
      );
    }
    return null;
  };

  const renderHeader = () => (
    <Header
      title={jobStatus === 'ongoing' ? 'Attendance' : 'Completed Job'}
      iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
    />
  );

  return (
    <VStack bg="white" flex={1}>
      {renderHeader()}
      {renderJobInfo()}
      {jobStatus === 'completed' ? renderTab() : null}
      {selectedTab.id === 0 && renderBillingInfo()}
      {selectedTab.id === 1 && renderAttendanceData()}
      {renderModal()}
    </VStack>
  );
};

export default AttendanceRecordScreen;
