import React, { useState } from 'react';
import { Button, VStack, HStack, Modal, Text, Icon, TextArea } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IAttendanceModalProps } from './attendance-modal.props';

const step = 0.5;
const noop = () => {};

enum Target {
  NORMAL_WORK_HOURS = 'NORMAL_WORK_HOURS',
  OT_WORK_HOURS = 'OT_WORK_HOURS',
  RATINGS = 'RATINGS',
}

interface IAdjustmentProps {
  title: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Adjustment = (props: IAdjustmentProps) => {
  const { title, value, minValue = 0, maxValue = 8.0, onDecrement, onIncrement } = props;
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text fontSize="sm">{title}</Text>
      <HStack space={2} alignItems="center">
        <Icon
          color={value === minValue ? 'gray.300' : 'black'}
          onPress={value === minValue ? noop : onDecrement}
          as={Ionicons}
          name="remove-circle-outline"
        />
        <Text w={10} fontWeight="bold" textAlign="center">
          {value === 0 ? 0 : value.toFixed(1)}
        </Text>
        <Icon
          color={value === maxValue ? 'gray.300' : 'black'}
          onPress={value === maxValue ? noop : onIncrement}
          as={Ionicons}
          name="add-circle-outline"
        />
      </HStack>
    </HStack>
  );
};

const AttendanceModal = (props: IAttendanceModalProps) => {
  const { attendanceData, visible, onClose } = props;
  const { name, normalHoursWorked, otHoursWorked, ratings } = attendanceData;

  const [normalWorkHours, setNormalWorkHours] = useState(normalHoursWorked);
  const [otHours, setOTHours] = useState(otHoursWorked);
  const [rating, setRating] = useState(ratings);

  const handleIncrement = (target: Target) => () => {
    if (target === Target.NORMAL_WORK_HOURS) {
      setNormalWorkHours((prev) => prev + step);
    }
    if (target === Target.OT_WORK_HOURS) {
      setOTHours((prev) => prev + step);
    }
    if (target === Target.RATINGS) {
      setRating((prev) => prev + step);
    }
  };

  const handleDecrement = (target: Target) => () => {
    if (target === Target.NORMAL_WORK_HOURS) {
      setNormalWorkHours((prev) => prev - step);
    }
    if (target === Target.OT_WORK_HOURS) {
      setOTHours((prev) => prev - step);
    }
    if (target === Target.RATINGS) {
      setRating((prev) => prev - step);
    }
  };

  return (
    <Modal avoidKeyboard closeOnOverlayClick isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            {/*  normal work hours */}
            <Adjustment
              title="Normal Work Hours"
              value={normalWorkHours}
              minValue={0}
              maxValue={20}
              onIncrement={handleIncrement(Target.NORMAL_WORK_HOURS)}
              onDecrement={handleDecrement(Target.NORMAL_WORK_HOURS)}
            />

            <Adjustment
              title="OT Work Hours"
              value={otHours}
              minValue={0}
              maxValue={12}
              onIncrement={handleIncrement(Target.OT_WORK_HOURS)}
              onDecrement={handleDecrement(Target.OT_WORK_HOURS)}
            />

            <Adjustment
              title="Rating"
              value={rating}
              minValue={0}
              maxValue={5}
              onIncrement={handleIncrement(Target.RATINGS)}
              onDecrement={handleDecrement(Target.RATINGS)}
            />

            <TextArea mt={4} placeholder="Write your comment about the worker if any ..." />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="unstyled" onPress={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AttendanceModal;
