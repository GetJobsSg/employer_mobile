import React from 'react';
import { Heading, HStack, View } from 'native-base';
import { CommonLayout } from 'src/constants/layout';
import { HeaderProps } from './header.props';

const Header = (props: HeaderProps) => {
  const { title, iconLeft, iconRight } = props;

  return (
    <HStack
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      safeAreaTop
      bg="white"
      px={CommonLayout.containerX}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack alignItems="center">
        {iconLeft && <View mr={2}>{iconLeft}</View>}
        {title && (
          <Heading fontWeight="600" size="sm">
            {title}
          </Heading>
        )}
      </HStack>

      <HStack space={6}>{iconRight && iconRight.map((iconComp, index) => <View key={index}>{iconComp}</View>)}</HStack>
    </HStack>
  );
};

export default Header;
