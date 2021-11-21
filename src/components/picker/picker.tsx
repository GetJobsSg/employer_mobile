import React, { useRef, useMemo } from 'react';
import { Box, HStack, Icon, Pressable, Text, VStack, Spinner } from 'native-base';
import { Picker as RNPicker } from '@react-native-picker/picker';
import RNSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { isIOS, isAndroid } from 'src/utils/platform';
import { PickerProps } from './picker.props';

const Picker = (props: PickerProps) => {
  const { onChange, label, options, placeholder, selectedValue, isLoading = false } = props;
  const sheetRef = useRef<any>();
  const androidPickerRef = useRef<any>();

  const handleDone = () => {
    // user open picker and then click done without roll to select, pick the first option
    if (!selectedValue && options.length) {
      onChange(options[0].value);
    }
    sheetRef.current.close();
  };

  const handleIOSPickerPress = () => {
    if (isLoading) return;
    sheetRef.current.open();
  };

  const handleAndroidPickerPress = () => {
    if (isLoading) return;
    androidPickerRef.current.focus();
  };

  // transfrom options array to { [value]:[label] }
  const optionsMap = useMemo(() => {
    const x = {} as any;
    options.forEach((option) => {
      x[option.value] = option.label;
    });
    return x;
  }, [options]);

  // ios need to display the picker inside pop up sheet
  if (isIOS) {
    return (
      <>
        <Pressable disabled={isLoading} onPress={handleIOSPickerPress}>
          <HStack alignItems="center" py={2} pb={4} borderBottomWidth={1} borderBottomColor="gray.100">
            <VStack flex={1}>
              <Text mb={2} fontSize="xs" color="gray.500">
                {label}
              </Text>

              {selectedValue === '' && (
                <Text fontWeight="600" color="gray.400">
                  {placeholder || 'Select an option'}
                </Text>
              )}

              {selectedValue !== '' && (
                <Text fontWeight="600" color="black">
                  {optionsMap[selectedValue]}
                </Text>
              )}
            </VStack>
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <Icon as={Ionicons} color="gray.400" name="chevron-forward-outline" size={5} />
            )}
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
  }

  // android do not need pop up sheet
  if (isAndroid) {
    return (
      <VStack>
        <Text mb={2} fontSize="xs" color="gray.500">
          {label}
        </Text>

        <Box position="relative" borderBottomWidth={1} borderColor="gray.100">
          <>
            <RNPicker
              ref={androidPickerRef}
              style={{ marginLeft: -16, marginTop: -8 }}
              selectedValue={selectedValue}
              onValueChange={onChange}
            >
              {options.map((option) => (
                <RNPicker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </RNPicker>

            {selectedValue === '' && (
              <Pressable
                disabled={isLoading}
                onPress={handleAndroidPickerPress}
                flex={1}
                bg="white"
                position="absolute"
                width="100%"
                h="100%"
              >
                <Text fontWeight="600" color="gray.400">
                  {placeholder || 'Select an option'}
                </Text>
              </Pressable>
            )}
          </>
        </Box>
      </VStack>
    );
  }

  return null;
};

export default Picker;
