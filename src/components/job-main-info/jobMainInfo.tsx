import React, { useState } from 'react';
import { Heading, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLayout } from 'src/constants/layout';
import { QRModal } from 'src/components';
import { JobMainInfoProps } from './jobMainInfo.props';

const JobMainInfo = (props: JobMainInfoProps) => {
  const { id, title, hourlyRate, date, time, startCode, endCode } = props;
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <VStack>
      <HStack px={CommonLayout.containerX} py={2} alignItems="flex-start">
        <VStack flex={1} justifyContent="flex-start">
          <Text fontSize="xs" color="gray.500">
            {`# ${id}`}
          </Text>
          <Heading size="sm">{title}</Heading>
          <Heading size="sm" color="pink.600" mt={2}>
            {`$${hourlyRate.toFixed(2)} / hour`}
          </Heading>
        </VStack>
        <Pressable bg="white" border={1} borderRadius="xl" borderColor="gray.100" p={2} mt={2}>
          <Icon as={Ionicons} name="qr-code-outline" size="md" onPress={() => setShowQRModal(true)} />
        </Pressable>
      </HStack>

      <VStack space={1} px={CommonLayout.containerX} py={2}>
        <HStack alignItems="center">
          <Icon mr={2} as={Ionicons} name="calendar-outline" size="sm" />
          <Text fontSize="sm" fontWeight="600">
            {date}
          </Text>
        </HStack>

        <HStack alignItems="center">
          <Icon mr={2} as={Ionicons} name="time-outline" size="sm" />
          <Text fontSize="sm" fontWeight="600">
            {time}
          </Text>
        </HStack>
      </VStack>

      <QRModal
        visible={showQRModal}
        qrClockInValue={startCode}
        qrClockOutValue={endCode}
        onCancel={() => setShowQRModal(false)}
      />
    </VStack>
  );
};

export default JobMainInfo;
