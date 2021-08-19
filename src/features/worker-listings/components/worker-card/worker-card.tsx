import React from 'react';
import { Box, HStack, VStack, Avatar, Text } from 'native-base';
import { Pressable } from 'react-native';
import { WorkerCardProps } from './worker-card.props';

const WorkerCard = (props: WorkerCardProps) => {
  const { avatar, name, age, ratings, clockInTime, clockOutTime, onCardClick } = props;

  return (
    <Pressable onPress={onCardClick}>
      <Box px={3} pr={4}>
        <HStack justifyContent="space-between">
          <HStack flex={1} py={2}>
            <Avatar mr={3} size={16} source={{ uri: avatar }} />
            <VStack flex={1}>
              <Text fontSize="sm" color="black" fontWeight="500" noOfLines={2}>
                {name}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                {`${age} years old`}
              </Text>
              <HStack>
                <Text fontSize="sm" color="primary.500" mr={1}>
                  &#9733;
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {ratings}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack ml={4} space={4} py={2}>
            <VStack>
              <Text fontSize={10} color="gray.500">
                Clock In
              </Text>
              <Text fontWeight="bold" color="gray.500">
                {clockInTime || '--:--'}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize={10} color="gray.500">
                Clock Out
              </Text>
              <Text fontWeight="bold" color="gray.500">
                {clockOutTime || '--:--'}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default WorkerCard;
