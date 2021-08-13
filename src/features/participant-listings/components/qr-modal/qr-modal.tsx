import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Box, Button, HStack, Modal, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { QRModalProps } from './qr-modal.props';

const screenWidth = Dimensions.get('window').width;

const QRModal = (props: QRModalProps) => {
  const { visible, onCancel } = props;
  return (
    <Modal closeOnOverlayClick isOpen={visible} onClose={onCancel}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>
          <HStack>
            <Box flex={1} borderBottomWidth={1} borderBottomColor="gray.900" pb={4}>
              <Text textAlign="center">Clock In</Text>
            </Box>

            <Text flex={1} textAlign="center">
              Clock Out
            </Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <QRCode size={screenWidth / 2} value="9923" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onPress={onCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default QRModal;
