import React from 'react';
import { Box, Heading, HStack, View } from 'native-base';
import { HeaderProps } from './header.props';

const Header = (props: HeaderProps) => {
  const { children, title, iconLeft, iconRight, labelRight } = props;

  const renderHeaderContent = () => {
    if (children) return children;
    return (
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          {iconLeft && (
            <View p={2} pr={4}>
              {iconLeft}
            </View>
          )}
          {title && (
            <Heading fontWeight="600" size="sm" color="gray.600">
              {title}
            </Heading>
          )}
        </HStack>

        <HStack space={6} px={2}>
          {iconRight && iconRight.map((iconComp, index) => <View key={index}>{iconComp}</View>)}
          {labelRight && <View p={2}>{labelRight}</View>}
        </HStack>
      </HStack>
    );
  };

  return (
    <Box
      bg="white"
      minHeight={24}
      justifyContent="center"
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      safeAreaTop
    >
      {renderHeaderContent()}
    </Box>
  );
};

export default Header;
