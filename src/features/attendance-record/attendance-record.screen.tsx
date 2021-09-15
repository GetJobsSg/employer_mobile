import React from 'react';
import { Heading, Text, Icon, VStack, FlatList, HStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, WorkerCard } from 'src/components';
import { ListRenderItem } from 'react-native';
import { constructJobDate } from 'src/utils/dateTime';
import { DD_MMM_YYYY } from 'src/constants/dateTime';

const AttendanceRecordScreen = () => {
  const renderHeader = () => (
    <VStack px={4} py={4}>
      <Text fontSize="xs" color="gray.500">
        # 1
      </Text>
      <Heading size="sm">Mc Delivery</Heading>
      <HStack mt={1} space={1}>
        <Text color="orange.800" fontSize="sm" fontWeight="500">
          {constructJobDate('2021-09-12', '2021-09-12', DD_MMM_YYYY)}
        </Text>
        <Text color="orange.800">&bull;</Text>
        <Text color="orange.800" fontSize="sm" fontWeight="500">
          08:00am - 14:00pm
        </Text>
      </HStack>
      <Text fontSize="sm" mt={2} color="gray.500">
        Tap on the worker below and start to give rating or amend their number of hours worked.
      </Text>
    </VStack>
  );

  const renderItem: ListRenderItem<{ id: string }> = () => (
    <WorkerCard
      avatar=""
      name="Toh Ban Soon"
      onCardClick={() => {}}
      clockInTime="12:00am"
      clockOutTime="08:30pm"
      age={18}
      ratings="4.5"
    />
  );

  return (
    <VStack bg="white" flex={1}>
      <Header
        title="Attendance Record"
        iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => {}} />}
      />
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ListHeaderComponent={renderHeader}
      />
    </VStack>
  );
};

export default AttendanceRecordScreen;
