import React, { useRef, useState } from 'react';
import {
  FormControl,
  Heading,
  HStack,
  Icon,
  VStack,
  Pressable,
  ScrollView,
  Text,
  TextField,
  TextArea,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Scaffold } from 'src/components';
import moment from 'moment';
import { DD_MMM_YYYY, HH_MM_A } from 'src/constants/dateTime';
import { getCalendarDay } from 'src/utils/dateTime';

const ArrowRight = () => (
  <Icon as={Ionicons} name="ios-chevron-forward-circle-outline" size={5} ml={4} color="gray.600" />
);

const JobDetailScreen = () => {
  const jobDateRef = useRef<any>();
  const [jobDate, setJobDate] = useState<Date | undefined>();

  const startTimeRef = useRef<any>();
  const [startTime, setStartTime] = useState<Date | undefined>();

  const endTimeRef = useRef<any>();
  const [endTime, setEndTime] = useState<Date | undefined>();

  return (
    <Scaffold>
      <ScrollView px={4}>
        <Heading py={4} size="lg">
          Create Job
        </Heading>

        <FormControl mb={8}>
          <Pressable onPress={() => jobDateRef.current.open()}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                Date
              </Text>
              <HStack>
                {jobDate && (
                  <Text fontSize="lg" color="gray.600" fontWeight="bold">
                    {`${moment(jobDate).format(DD_MMM_YYYY)} (${getCalendarDay(jobDate)})`}
                  </Text>
                )}
                {!jobDate && (
                  <Text fontSize="lg" color="gray.400" fontWeight="bold">
                    Select Date
                  </Text>
                )}
                <ArrowRight />
              </HStack>
            </VStack>
          </Pressable>
        </FormControl>

        <HStack mb={8}>
          <FormControl flex={1}>
            <Pressable onPress={() => startTimeRef.current.open()}>
              <VStack>
                <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                  Start Time
                </Text>
                <HStack>
                  {startTime && (
                    <Text fontSize="lg" color="gray.600" fontWeight="bold">
                      {moment(startTime).format(HH_MM_A)}
                    </Text>
                  )}
                  {!startTime && (
                    <Text fontSize="md" color="gray.400" fontWeight="bold">
                      Select Time
                    </Text>
                  )}
                  <ArrowRight />
                </HStack>
              </VStack>
            </Pressable>
          </FormControl>

          <FormControl flex={1}>
            <Pressable onPress={() => endTimeRef.current.open()}>
              <VStack>
                <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                  Start Time
                </Text>
                <HStack>
                  {endTime && (
                    <Text fontSize="lg" color="gray.600" fontWeight="bold">
                      {moment(endTime).format(HH_MM_A)}
                    </Text>
                  )}
                  {!endTime && (
                    <Text fontSize="md" color="gray.400" fontWeight="bold">
                      Select Time
                    </Text>
                  )}
                  <ArrowRight />
                </HStack>
              </VStack>
            </Pressable>
          </FormControl>
        </HStack>

        <FormControl>
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Job Title
          </Text>
          <TextField variant="underlined" />
        </FormControl>

        <FormControl mb={4}>
          <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
            Job Description
          </Text>
          <TextArea placeholder="Job Description" />
        </FormControl>

        <FormControl>
          <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
            Hourly Rate
          </Text>
          <TextField keyboardType="decimal-pad" placeholder="Hourly Rate" />
        </FormControl>

        <FormControl mb={4}>
          <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
            Job Responsibilities
          </Text>
          <TextArea placeholder="Job Description" />
        </FormControl>

        <FormControl mb={4}>
          <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
            Job Requirements
          </Text>
          <TextArea placeholder="Job Description" />
        </FormControl>
      </ScrollView>

      <RBSheet ref={jobDateRef}>
        <DatePicker
          mode="date"
          minimumDate={jobDate}
          date={jobDate || new Date()}
          onDateChange={(date) => setJobDate(date)}
        />
      </RBSheet>

      <RBSheet ref={startTimeRef}>
        <DatePicker
          mode="time"
          minuteInterval={15}
          date={startTime || new Date()}
          onDateChange={(time) => setStartTime(time)}
        />
      </RBSheet>

      <RBSheet ref={endTimeRef}>
        <DatePicker
          mode="time"
          minuteInterval={15}
          date={endTime || new Date()}
          onDateChange={(time) => setEndTime(time)}
        />
      </RBSheet>
    </Scaffold>
  );
};

export default JobDetailScreen;
