import React, { useState } from 'react';
import { Heading, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLayout } from 'src/constants/layout';
import { QRModal } from 'src/components';
import { JobMainInfoProps } from './jobMainInfo.props';

const JobMainInfo = (props: JobMainInfoProps) => {
  const { action, id, title, hourlyRate, date, time, startCode, endCode } = props;
  const [showQRModal, setShowQRModal] = useState(false);

  const jobId = `# ${id}`;
  const rate = `${hourlyRate.toFixed(2)}/hour`;

  return (
    <VStack>
      <HStack px={CommonLayout.containerX} py={2} alignItems="flex-start">
        <VStack space={2} flex={1}>
          <VStack>
            <Text fontSize="xs" color="gray.500">
              {jobId}
            </Text>
            <Heading size="sm">{title}</Heading>
            <Heading size="sm" color="pink.600">
              {rate}
            </Heading>
          </VStack>

          <VStack space={1}>
            <Text fontSize="sm" fontWeight="500">
              {date}
            </Text>
            <Text fontSize="sm" fontWeight="500">
              {time}
            </Text>
          </VStack>

          {action?.label && action?.onPress && (
            <HStack alignItems="center" space={2}>
              <Pressable onPress={action.onPress}>
                <Text color="" underline fontSize="sm" fontWeight="600">
                  {action.label}
                </Text>
              </Pressable>
            </HStack>
          )}
        </VStack>

        <Pressable bg="white" border={1} borderRadius="xl" borderColor="gray.100" p={2} mt={2}>
          <Icon as={Ionicons} name="qr-code-outline" size="md" onPress={() => setShowQRModal(true)} />
        </Pressable>
      </HStack>

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
