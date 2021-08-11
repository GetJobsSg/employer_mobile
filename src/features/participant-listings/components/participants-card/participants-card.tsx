import React from 'react';
import { Box, Button, Text, HStack, Icon, VStack, Avatar } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLayout } from 'src/constants/layout';
import { ParticipantsCardProps } from './participants-card.props';

const ParticipantCard = (props: ParticipantsCardProps) => {
  const {
    age,
    name,
    gender,
    ratings,
    avatarUrl,
    onSendOffer,
    isSendingOffer,
    isRejecting,
    onReject,
    onPhoneCall,
    onWhatsapp,
  } = props;

  return (
    <Box mx={CommonLayout.containerX}>
      <HStack>
        <Avatar mr={4} size={16} source={{ uri: avatarUrl }} />
        <VStack flex={1}>
          <Text flex={1} fontSize="sm" color="black" fontWeight="500" noOfLines={2}>
            {name}
          </Text>

          <HStack>
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

          <HStack mt={1}>
            <Text fontSize="sm" color="primary.500" mr={1}>
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
              <Button
                disabled={isRejecting}
                width={100}
                variant="unstyled"
                onPress={onReject}
                bg="pink.100"
                px={4}
                mt={2}
              >
                {isRejecting ? (
                  <Text fontSize="xs" color="pink.600">
                    Rejecting
                  </Text>
                ) : (
                  <Text fontSize="xs" color="pink.600">
                    Reject
                  </Text>
                )}
              </Button>
            )}

            {onPhoneCall && (
              <Button width={50} onPress={onPhoneCall} variant="unstyled" bg="gray.100" px={4} mt={2}>
                <Icon as={Ionicons} name="call-outline" size={4} />
              </Button>
            )}

            {onWhatsapp && (
              <Button width={50} onPress={onWhatsapp} variant="unstyled" bg="green.50" px={4} mt={2}>
                <Icon color="green.500" as={Ionicons} name="logo-whatsapp" size={4} />
              </Button>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ParticipantCard;
