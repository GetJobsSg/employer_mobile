import React from 'react';
import { Modal, Text } from 'native-base';
import { TimeClockProps } from './timeclock-modal.props';

const TimeClockModal = (props: TimeClockProps) => {
  const { visible, onCancel } = props;
  return (
    <Modal closeOnOverlayClick isOpen={visible} onClose={onCancel}>
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <Text>Modal Contennt</Text>
        </Modal.Body>
        <Modal.Footer />
      </Modal.Content>
    </Modal>
  );
};

export default TimeClockModal;
