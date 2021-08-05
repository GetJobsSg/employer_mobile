import React, { useRef, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { FormControl, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import { Picker } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { DD_MMM_YYYY, HH_MM_A } from 'src/constants/dateTime';
import { getCalendarDay } from 'src/utils/dateTime';

import { FieldName } from './formInitialValues';
import { jobDetailsActions } from '../slice';

const ArrowRight = () => <Icon as={Ionicons} name="ios-chevron-forward" size={5} ml={4} color="gray.400" />;
interface DateTimeFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const DateTimeForm = (props: DateTimeFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoadingGetAllCategories, allCategories } = useAppSelector((state) => state.jobDetails);
  console.log({ isLoadingGetAllCategories, allCategories });

  const { formValues, formErrors, setFormFieldValue } = props;

  const startDateRef = useRef<any>();
  const startTimeRef = useRef<any>();
  const endTimeRef = useRef<any>();

  useEffect(() => {
    dispatch(jobDetailsActions.getAllCategoriesRequest());
  }, [dispatch]);

  const renderDate = () => {
    const jobDate = formValues[FieldName.startDate];

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
    const startTime = formValues[FieldName.startTime];

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
    const endTime = formValues[FieldName.endTime];

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

  const [selected, setSelected] = useState();
  const handleSelect = (selectedOption: any) => {
    setSelected(selectedOption);
  };
  const categoryOptionList = allCategories.map((c) => ({ label: c.name, value: c.id }));

  return (
    <>
      <VStack bg="white" pt={4}>
        <FormControl isInvalid mb={8}>
          <Pressable onPress={() => startDateRef.current.open()}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                Date
              </Text>
              <HStack justifyContent="space-between">
                {renderDate()}
                <ArrowRight />
              </HStack>
            </VStack>
            <FormControl.ErrorMessage>{formErrors[FieldName.startDate]}</FormControl.ErrorMessage>
          </Pressable>
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
            <FormControl.ErrorMessage>{formErrors[FieldName.startTime]}</FormControl.ErrorMessage>
          </Pressable>
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
            <FormControl.ErrorMessage>{formErrors[FieldName.endTime]}</FormControl.ErrorMessage>
          </Pressable>
        </FormControl>
      </VStack>

      <Picker selectedValue={selected} onChange={handleSelect} options={categoryOptionList} />

      <RBSheet ref={startDateRef}>
        <DatePicker
          mode="date"
          minimumDate={new Date()} // must greater than current time
          date={formValues[FieldName.startDate] || new Date()}
          onDateChange={(date) => {
            setFormFieldValue(FieldName.startDate, date);
            setFormFieldValue(FieldName.endDate, date);
          }}
        />
      </RBSheet>

      <RBSheet ref={startTimeRef}>
        <DatePicker
          mode="time"
          minuteInterval={15}
          date={formValues[FieldName.startTime] || new Date()}
          onDateChange={(time) => setFormFieldValue(FieldName.startTime, time)}
        />
      </RBSheet>

      <RBSheet ref={endTimeRef}>
        <VStack flex={1} bg="dark.800">
          <HStack>
            <Text>Done</Text>
          </HStack>
          <DatePicker
            style={{ width: Dimensions.get('window').width }}
            mode="time"
            minuteInterval={15}
            date={formValues[FieldName.endTime] || new Date()}
            onDateChange={(time) => setFormFieldValue(FieldName.endTime, time)}
          />
        </VStack>
      </RBSheet>
    </>
  );
};

export default DateTimeForm;
