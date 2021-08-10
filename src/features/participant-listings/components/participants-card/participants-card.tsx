import React from 'react';
import { Box, Button, Text, HStack, VStack, Avatar } from 'native-base';
import { ParticipantsCardProps } from './participants-card.props';

const ParticipantCard = (props: ParticipantsCardProps) => {
  const { age, name, gender, ratings, avatarUrl, onSendOffer, isSendingOffer, onReject, onPhoneCall } = props;

  return (
    <Box>
      <HStack>
        <Avatar flexShrink={0} mr={4} size={16} source={{ uri: avatarUrl }} />
        <VStack flex={1}>
          <Text flex={1} fontSize="sm" color="black" fontWeight="500" noOfLines={2}>
            {name}
          </Text>

          <HStack mt={1}>
            {!!gender && (
              <>
                <Text fontSize="sm" color="gray.500">
                  {gender}
                </Text>
                <Text> &bull; </Text>
              </>
            )}

            <Text fontSize="sm" color="gray.500">
              {`${age} years old`}
            </Text>
          </HStack>

          <HStack>
            <Text fontSize="sm" color="primary.500" mr={2}>
              &#9733;
            </Text>
            <Text fontSize="sm" color="gray.500">
              {ratings}
            </Text>
          </HStack>

          <HStack space={2} flexWrap="wrap">
            {onSendOffer && (
              <Button
                width={100}
                disabled={isSendingOffer}
                onPress={onSendOffer}
                variant="unstyled"
                bg="gray.100"
                px={4}
                mt={2}
              >
                {isSendingOffer ? <Text fontSize="xs">Sending</Text> : <Text fontSize="xs">Send Offer</Text>}
              </Button>
            )}

            {onReject && (
              <Button variant="unstyled" bg="pink.100" px={4} mt={2}>
                <Text fontSize="xs" color="pink.600">
                  Reject
                </Text>
              </Button>
            )}

            {onPhoneCall && (
              <Button variant="unstyled" bg="gray.100" px={4} mt={2}>
                <Text fontSize="xs">Call</Text>
              </Button>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ParticipantCard;
