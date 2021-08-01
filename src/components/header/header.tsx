import React from 'react';
import { Box, Heading, HStack, View } from 'native-base';
import { CommonLayout } from 'src/constants/layout';
import { HeaderProps } from './header.props';

const Header = (props: HeaderProps) => {
  const { children, title, iconLeft, iconRight } = props;

  const renderHeaderContent = () => {
    if (children) return children;
    return (
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          {iconLeft && <View mr={2}>{iconLeft}</View>}
          {title && (
            <Heading size="md" color="black">
              {title}
            </Heading>
          )}
        </HStack>

        <HStack space={6}>
          {iconRight && iconRight.map((iconComp, index) => <View key={index}>{iconComp}</View>)}
        </HStack>
      </HStack>
    );
  };

  return (
    <Box borderBottomWidth={1} borderBottomColor="gray.100" safeAreaTop bg="white" px={CommonLayout.containerX} py={2}>
      {renderHeaderContent()}
    </Box>
  );
};

export default Header;
