import React, { useRef } from 'react';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button, FormControl, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { DD_MMM_YYYY, HH_MM_A } from 'src/constants/dateTime';
import { getCalendarDay } from 'src/utils/dateTime';
import { Footer } from 'src/components';
import { CommonLayout } from 'src/constants/layout';
import * as yup from 'yup';

enum FieldName {
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',
}

const schema = () =>
  yup.object({
    [FieldName.startDate]: yup.date().required(),
    [FieldName.endDate]: yup.date().required(),
    [FieldName.startTime]: yup.date().required(),
    [FieldName.endTime]: yup.date().required(),
  });

const ArrowRight = () => <Icon as={Ionicons} name="ios-chevron-forward" size={5} ml={4} color="gray.400" />;

const SelectDateTimeForm = () => {
  //   console.log(props);
  const jobDateRef = useRef<any>();
  const startTimeRef = useRef<any>();
  const endTimeRef = useRef<any>();

  const { errors, setFieldValue, handleSubmit, values } = useFormik({
    initialValues: {
      [FieldName.startDate]: undefined,
      [FieldName.endDate]: undefined,
      [FieldName.startTime]: undefined,
      [FieldName.endTime]: undefined,
    },
    validationSchema: schema,
    validate: () => {
      console.log('on validating...');
    },
    validateOnChange: true,
    onSubmit: (_values) => {
      console.log(_values);
    },
  });

  const renderDate = () => {
    const jobDate = values[FieldName.startDate];

    if (jobDate) {
      const formattedDate = `${moment(jobDate).format(DD_MMM_YYYY)} (${getCalendarDay(jobDate)})`;
      return (
        <Text fontSize="lg" color="gray.600" fontWeight="bold">
          {formattedDate}
        </Text>
      );
    }
    return (
      <Text fontSize="lg" color="gray.400" fontWeight="bold">
        Select Date
      </Text>
    );
  };

  const renderStartTime = () => {
    const startTime = values[FieldName.startTime];
    console.log({ startTime });

    if (startTime) {
      const formattedTime = moment(startTime).format(HH_MM_A);
      return (
        <Text fontSize="lg" color="gray.600" fontWeight="bold">
          {formattedTime}
        </Text>
      );
    }
    return (
      <Text fontSize="lg" color="gray.400" fontWeight="bold">
        Select Start Time
      </Text>
    );
  };

  const renderEndTime = () => {
    const endTime = values[FieldName.endTime];
    console.log({ endTime });

    if (endTime) {
      const formattedTime = moment(endTime).format(HH_MM_A);
      return (
        <Text fontSize="lg" color="gray.600" fontWeight="bold">
          {formattedTime}
        </Text>
      );
    }
    return (
      <Text fontSize="lg" color="gray.400" fontWeight="bold">
        Select End Time
      </Text>
    );
  };

  return (
    <>
      <VStack bg="white" px={CommonLayout.containerX} flex={1}>
        <FormControl isInvalid mb={8}>
          <Pressable onPress={() => jobDateRef.current.open()}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                Date
              </Text>
              <HStack justifyContent="space-between">
                {renderDate()}
                <ArrowRight />
              </HStack>
            </VStack>
          </Pressable>
          <FormControl.ErrorMessage>{errors[FieldName.startDate]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid mb={8}>
          <Pressable onPress={() => startTimeRef.current.open()}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                Start Time
              </Text>
              <HStack justifyContent="space-between">
                {renderStartTime()}
                <ArrowRight />
              </HStack>
            </VStack>
          </Pressable>
          <FormControl.ErrorMessage>{errors[FieldName.startTime]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid mb={8}>
          <Pressable onPress={() => endTimeRef.current.open()}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                End Time
              </Text>
              <HStack justifyContent="space-between">
                {renderEndTime()}
                <ArrowRight />
              </HStack>
            </VStack>
          </Pressable>
          <FormControl.ErrorMessage>{errors[FieldName.endTime]}</FormControl.ErrorMessage>
        </FormControl>
      </VStack>

      <Footer>
        <Button onPress={handleSubmit}>Next</Button>
      </Footer>

      <RBSheet customStyles={{}} ref={jobDateRef}>
        <DatePicker
          mode="date"
          minimumDate={new Date()} // must greater than current time
          date={values[FieldName.startDate] || new Date()}
          onDateChange={(date) => {
            // we only need to cater single day, so both startDate endDate will always be the same
            setFieldValue(FieldName.startDate, date);
            setFieldValue(FieldName.endDate, date);
          }}
        />
      </RBSheet>

      <RBSheet customStyles={{}} ref={startTimeRef}>
        <DatePicker
          mode="time"
          minuteInterval={15}
          date={values[FieldName.startTime] || new Date()}
          onDateChange={(time) => {
            console.log({ time });
            setFieldValue(FieldName.startTime, time);
          }}
        />
      </RBSheet>

      <RBSheet customStyles={{}} ref={endTimeRef}>
        <DatePicker
          mode="time"
          minuteInterval={15}
          date={values[FieldName.endTime] || new Date()}
          onDateChange={(time) => setFieldValue(FieldName.endTime, time)}
        />
      </RBSheet>
    </>
  );
};

export default SelectDateTimeForm;
