import React from 'react';
import { Box, Button, Text, HStack, VStack, Avatar, Divider } from 'native-base';
import { ParticipantsCardProps } from './participants-card.props';

const ParticipantCard = (props: ParticipantsCardProps) => {
  const { name, gender, ratings, avatarUrl } = props;
  return (
    <Box>
      <HStack>
        <Avatar mr={4} size={16} source={{ uri: avatarUrl }} />
        <VStack>
          <Text fontSize="md" color="black" fontWeight="bold" noOfLines={2}>
            {name}
          </Text>

          <HStack>
            <Text fontSize="sm" color="gray.500">
              {gender}
            </Text>
            <Text> &bull; </Text>
            <Text fontSize="sm" color="gray.500">
              28 yrs old
            </Text>
          </HStack>

          <HStack mb={2}>
            <Text fontSize="sm" color="primary.500" mr={2}>
              &#9733;
            </Text>
            <Text fontSize="sm" color="black" fontWeight="bold">
              {ratings}
            </Text>
          </HStack>

          <HStack>
            <Button variant="unstyled" width={100} bg="gray.100" p={2}>
              <Text fontSize="xs">Send Offer</Text>
            </Button>
            <Divider orientation="vertical" mx={2} bgColor="white" />
            <Button variant="outline" colorScheme="danger" width={100}>
              <Text fontSize="xs" color="danger.400">
                Reject
              </Text>
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ParticipantCard;
