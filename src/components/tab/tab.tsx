import React from 'react';
import { HStack, Button, Text } from 'native-base';
import { TabProps, TabOption } from './tab.props';

const Tab = (props: TabProps) => {
  const { onSelect, options, selected, align = 'stretch' } = props;

  const handleSelect = (option: TabOption) => () => {
    onSelect(option);
  };

  return (
    <HStack alignItems="center" justifyContent={align === 'stretch' ? 'space-between' : 'flex-start'}>
      {options.map((option) => (
        <Button
          key={option.id}
          borderRadius={50}
          variant="unstyled"
          size="xs"
          pt={2}
          pb={2}
          px={3}
          bg={selected.id === option.id ? 'black' : 'white'}
          onPress={handleSelect(option)}
        >
          <Text fontSize="xs" fontWeight="500" color={selected.id === option.id ? 'white' : 'gray.400'}>
            {option.label}
          </Text>
        </Button>
      ))}
    </HStack>
  );
};

export default Tab;
