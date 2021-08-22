import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button, HStack, Modal, Pressable, Text, VStack } from 'native-base';
import { Dimensions } from 'react-native';
import { QRModalProps } from './qr-modal.props';

const screenWidth = Dimensions.get('window').width;

enum ActiveTab {
  CLOCK_IN = 'CLOCK_IN',
  CLOCK_OUT = 'CLOCK_OUT',
}

const QRModal = (props: QRModalProps) => {
  const { qrClockInValue, qrClockOutValue, visible, onCancel } = props;
  const [activeTab, setActiveTab] = useState(ActiveTab.CLOCK_IN);

  const getActiveStyle = (tab: ActiveTab) => {
    if (activeTab === tab) {
      return {
        color: 'gray.900',
        borderColor: 'gray.900',
        fontWeight: '500',
      };
    }
    return {
      color: 'gray.400',
      borderColor: 'gray.200',
      fontWeight: '300',
    };
  };

  const renderQRCode = () => {
    if (activeTab === ActiveTab.CLOCK_IN && !qrClockInValue) {
      return <Text>Clock In QR Code Not Found</Text>;
    }

    if (activeTab === ActiveTab.CLOCK_OUT && !qrClockOutValue) {
      return <Text>Clock Out QR Code Not Found</Text>;
    }

    if (activeTab === ActiveTab.CLOCK_IN) {
      return (
        <>
          <Text fontWeight="bold" fontSize="xl" py={2}>
            {`Code: ${qrClockInValue}`}
          </Text>
          <QRCode size={screenWidth / 2} value={qrClockInValue as string} />
        </>
      );
    }

    if (activeTab === ActiveTab.CLOCK_OUT) {
      return (
        <>
          <Text fontWeight="bold" fontSize="xl" py={2}>
            {`Code: ${qrClockOutValue}`}
          </Text>
          <QRCode size={screenWidth / 2} value={qrClockOutValue as string} />
        </>
      );
    }

    return null;
  };

  return (
    <Modal closeOnOverlayClick isOpen={visible} onClose={onCancel}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>
          <HStack>
            <Pressable
              onPress={() => setActiveTab(ActiveTab.CLOCK_IN)}
              flex={1}
              borderBottomWidth={1}
              borderBottomColor={getActiveStyle(ActiveTab.CLOCK_IN).borderColor}
              pb={4}
            >
              <Text
                fontWeight={getActiveStyle(ActiveTab.CLOCK_IN).fontWeight}
                color={getActiveStyle(ActiveTab.CLOCK_IN).color}
                fontSize="sm"
                textAlign="center"
              >
                Clock In
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab(ActiveTab.CLOCK_OUT)}
              flex={1}
              borderBottomWidth={1}
              borderBottomColor={getActiveStyle(ActiveTab.CLOCK_OUT).borderColor}
              pb={4}
            >
              <Text
                fontWeight={getActiveStyle(ActiveTab.CLOCK_OUT).fontWeight}
                color={getActiveStyle(ActiveTab.CLOCK_OUT).color}
                fontSize="sm"
                textAlign="center"
              >
                Clock Out
              </Text>
            </Pressable>
          </HStack>
        </Modal.Header>

        <Modal.Body flex={1} justifyContent="center" alignItems="center">
          <VStack>{renderQRCode()}</VStack>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="unstyled" onPress={onCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default QRModal;
