import React, { useRef, useMemo } from 'react';
import { Pressable } from 'react-native';
import { HStack, Icon, Text, VStack } from 'native-base';
import { Picker as RNPicker } from '@react-native-picker/picker';
import RNSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PickerProps } from './picker.props';

// const isIOS = Platform.OS === 'ios';

const Picker = (props: PickerProps) => {
  const { onChange, options, selectedValue } = props;
  const sheetRef = useRef<any>();

  const handleDone = () => {
    // user open picker and then click done without roll to select, pick the first option
    if (!selectedValue && options.length) {
      onChange(options[0].value);
    }
    sheetRef.current.close();
  };

  // transfrom options array to { [value]:[label] }
  const optionsMap = useMemo(() => {
    const x = {} as any;
    options.forEach((option) => {
      x[option.value] = option.label;
    });
    return x;
  }, [options]);

  return (
    <>
      <Pressable onPress={() => sheetRef.current.open()}>
        <HStack alignItems="center" py={2} pb={4} borderBottomWidth={1} borderBottomColor="gray.100">
          <VStack flex={1}>
            <Text mb={2} fontSize="xs" color="gray.500">
              Category
            </Text>

            {!selectedValue && (
              <Text fontWeight="bold" color="gray.400">
                Select an option
              </Text>
            )}

            {selectedValue && (
              <Text fontWeight="bold" color="black">
                {optionsMap[selectedValue]}
              </Text>
            )}
          </VStack>
          <Icon as={Ionicons} color="gray.400" name="chevron-forward-outline" size={5} />
        </HStack>
      </Pressable>

      <RNSheet ref={sheetRef}>
        <HStack borderBottomWidth={1} borderBottomColor="gray.200" justifyContent="flex-end">
          <Text fontWeight="500" color="blue.500" p={3} onPress={handleDone}>
            Done
          </Text>
        </HStack>
        <RNPicker selectedValue={selectedValue} onValueChange={onChange}>
          {options.map((option) => (
            <RNPicker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </RNPicker>
      </RNSheet>
    </>
  );
};

export default Picker;
