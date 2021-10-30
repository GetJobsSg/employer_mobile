import React from 'react';
import { VStack, Text } from 'native-base';
import { BannerProps } from './banner.props';

const Banner = (props: BannerProps) => {
  const { message = 'No Result' } = props;
  return (
    <VStack px={4}>
      <VStack px={4} py={4} borderWidth={1} borderRadius={4} borderColor="gray.200" bg="gray.100">
        <Text fontSize="sm" fontWeight="500" color="gray.400">
          {message}
        </Text>
      </VStack>
    </VStack>
  );
};

export default Banner;
