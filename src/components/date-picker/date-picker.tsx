import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNDatePicker from 'react-native-date-picker';
import moment from 'moment';
import { DD_MMM_YYYY } from 'src/constants/dateTime';
import { DatePickerProps } from './date-picker.props';

const screenWidth = Dimensions.get('window').width;

const DatePicker = (props: DatePickerProps) => {
  const {
    disabled = false,
    format = DD_MMM_YYYY,
    label,
    onChange,
    placeholder,
    mode,
    minimumDate,
    maximumDate,
    minuteInterval = 15,
    selectedDate,
  } = props;
  const sheetRef = useRef<any>();

  const handleDone = () => {
    sheetRef.current.close();
  };

  return (
    <>
      <Pressable onPress={!disabled ? () => sheetRef.current.open() : null}>
        <HStack alignItems="center" py={2} pb={4} borderBottomWidth={1} borderBottomColor="gray.100">
          <VStack flex={1}>
            <Text mb={2} fontSize="xs" color="gray.500">
              {label}
            </Text>
            {!selectedDate && (
              <Text fontWeight="600" color="gray.400">
                {placeholder || 'Select date or time'}
              </Text>
            )}
            {selectedDate && (
              <Text fontWeight="600" color="black">
                {moment(selectedDate).format(format)}
              </Text>
            )}
          </VStack>
          {!disabled && <Icon as={Ionicons} color="gray.400" name="chevron-forward-outline" size={5} />}
        </HStack>
      </Pressable>

      <RBSheet ref={sheetRef}>
        <HStack borderBottomWidth={1} borderBottomColor="gray.100" justifyContent="flex-end">
          <Text fontWeight="500" color="blue.500" p={3} onPress={handleDone}>
            {!selectedDate ? 'Cancel' : 'Done'}
          </Text>
        </HStack>
        <RNDatePicker
          style={{ width: screenWidth }}
          mode={mode || 'datetime'}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          date={selectedDate || new Date()}
          minuteInterval={minuteInterval}
          onDateChange={onChange}
        />
      </RBSheet>
    </>
  );
};

export default DatePicker;
