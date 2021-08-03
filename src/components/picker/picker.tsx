import React, { useRef, useMemo } from 'react';
import { Pressable } from 'react-native';
import { Text } from 'native-base';
import { Picker as RNPicker } from '@react-native-picker/picker';
import RNSheet from 'react-native-raw-bottom-sheet';

import { PickerProps } from './picker.props';

// const isIOS = Platform.OS === 'ios';

const Picker = (props: PickerProps) => {
  const { onChange, options, selectedValue } = props;
  const sheetRef = useRef<any>();

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
        <Text mb={2} fontSize="xs" color="gray.400">
          Category
        </Text>

        {!selectedValue && (
          <Text fontWeight="bold" color="gray.400">
            Select an option
          </Text>
        )}

        {selectedValue && (
          <Text fontWeight="bold" color="gray.400">
            {optionsMap[selectedValue]}
          </Text>
        )}
      </Pressable>

      <RNSheet ref={sheetRef}>
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
