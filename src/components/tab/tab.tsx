import React from 'react';
import { HStack, Button } from 'native-base';
import { TabProps, TabOption } from './tab.props';

const Tab = (props: TabProps) => {
  const { onSelect, options, selected } = props;

  const handleSelect = (option: TabOption) => () => {
    onSelect(option);
  };

  return (
    <HStack space={1}>
      {options.map((option) => (
        <Button
          key={option.id}
          border={selected.id === option.id ? 2 : 0}
          borderRadius={50}
          variant="unstyled"
          size="xs"
          bg={selected.id === option.id ? 'black' : 'white'}
          p={2}
          onPress={handleSelect(option)}
        >
          {option.label}
        </Button>
      ))}
    </HStack>
  );
};

export default Tab;
