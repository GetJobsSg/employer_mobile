import React, { useState } from 'react';
import { Box, HStack, VStack, Avatar, Text, Pressable } from 'native-base';
import { WorkerCardProps } from './worker-card.props';

const WorkerCard = (props: WorkerCardProps) => {
  const { avatar, name, age, ratings, clockInTime, clockOutTime, onCardClick } = props;
  const [focusColor, setFocusColor] = useState<'gray.100' | 'white'>('white');

  return (
    <Pressable
      onPressIn={() => setFocusColor('gray.100')}
      onPressOut={() => setFocusColor('white')}
      onPress={onCardClick}
    >
      <Box bgColor={focusColor} px={3} pr={4} py={2}>
        <HStack justifyContent="space-between" space={4}>
          <HStack flex={1} py={2}>
            <Avatar mr={3} size={12} source={{ uri: avatar }} />
            <VStack flex={1}>
              <Text fontSize="sm" fontWeight="600" noOfLines={2}>
                {name}
              </Text>
              <Text fontSize="xs" color="gray.500" mt={1}>
                {`${age} years old`}
              </Text>
              <HStack mt={1}>
                <Text fontSize="xs" color="primary.500" mr={1}>
                  &#9733;
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {ratings}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <VStack>
            <HStack space={4} py={2}>
              <VStack>
                <Text fontSize={10} color="gray.500">
                  Clock In
                </Text>
                <Text mt={1} fontSize="sm" fontWeight="600">
                  {clockInTime || '--:--'}
                </Text>
              </VStack>

              <VStack>
                <Text fontSize={10} color="gray.500">
                  Clock Out
                </Text>
                <Text mt={1} fontSize="sm" fontWeight="600">
                  {clockOutTime || '--:--'}
                </Text>
              </VStack>
            </HStack>

            <VStack>
              <Text fontSize={10} color="gray.500">
                Work Hours / OT Hours
              </Text>
              <HStack mt={1} space={1} justifyContent="flex-start">
                <Text fontSize="sm" fontWeight="600">
                  8.5 hrs
                </Text>

                <Text color="green.500" fontSize={10} fontWeight="600">
                  +1.5 hrs
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default WorkerCard;
