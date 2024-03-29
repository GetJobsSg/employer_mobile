import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Button, VStack, HStack, Modal, Text, Icon, TextArea } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getHoursAndMins } from 'src/utils/dateTime';
import { IAttendanceModalProps } from './attendance-modal.props';
import { IWorkingDataRequestPayload } from '../../slice/types';

const step = 0.5;
const noop = () => {};

enum Target {
  NORMAL_WORK_HOURS = 'NORMAL_WORK_HOURS',
  OT_WORK_HOURS = 'OT_WORK_HOURS',
  RATINGS = 'RATINGS',
}

interface IAdjustmentProps {
  disabled?: boolean;
  type?: 'hourAndMin' | 'rating';
  title: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Adjustment = (props: IAdjustmentProps) => {
  const {
    disabled = false,
    type = 'hourAndMin',
    title,
    value,
    minValue = 0,
    maxValue = 8.0,
    onDecrement,
    onIncrement,
  } = props;

  return (
    <VStack space={1}>
      <Text color="gray.500" flex={1} fontSize="sm">
        {title}
      </Text>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" textAlign="center">
          {type === 'hourAndMin' && getHoursAndMins(value)}
          {type === 'rating' && value.toFixed(1)}
        </Text>

        <HStack space={4}>
          <Icon
            color={value === minValue || disabled ? 'gray.300' : 'black'}
            onPress={value === minValue || disabled ? noop : onDecrement}
            as={Ionicons}
            name="remove-circle-outline"
          />

          <Icon
            color={value === maxValue || disabled ? 'gray.300' : 'black'}
            onPress={value === maxValue || disabled ? noop : onIncrement}
            as={Ionicons}
            name="add-circle-outline"
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

const AttendanceModal = (props: IAttendanceModalProps) => {
  const { attendanceData, isLoadingUpdate = false, visible, onClose, onOK } = props;
  const { comment, name, normalHoursWorked, otHoursWorked, ratings, jobseekerId } = attendanceData;

  const [normalWorkHours, setNormalWorkHours] = useState(normalHoursWorked);
  const [otHours, setOTHours] = useState(otHoursWorked);
  const [rating, setRating] = useState(ratings);
  const [employerComment, setEmployerComment] = useState(comment);

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

  const isDirty = () => {
    if (normalHoursWorked !== normalWorkHours) return true;
    if (otHoursWorked !== otHours) return true;
    if (ratings !== rating) return true;
    if (comment !== employerComment) return true;
    return false;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const data: IWorkingDataRequestPayload = {
      employee_id: jobseekerId,
      normal_hours_worked: normalWorkHours,
      ot_hours_worked: otHours,
      rating,
      comments: employerComment,
    };
    onOK(data);
  };

  return (
    <Modal avoidKeyboard closeOnOverlayClick isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>{name}</Modal.Header>

        <Modal.Body>
          <VStack space={4}>
            <Adjustment
              disabled
              title="System Computed Hours"
              value={normalWorkHours}
              minValue={0}
              maxValue={20}
              onIncrement={handleIncrement(Target.NORMAL_WORK_HOURS)}
              onDecrement={handleDecrement(Target.NORMAL_WORK_HOURS)}
            />

            <Adjustment
              title="Additional Hours"
              value={otHours}
              minValue={0}
              maxValue={12}
              onIncrement={handleIncrement(Target.OT_WORK_HOURS)}
              onDecrement={handleDecrement(Target.OT_WORK_HOURS)}
            />

            <Adjustment
              title="Rating"
              type="rating"
              value={rating}
              minValue={0}
              maxValue={5}
              onIncrement={handleIncrement(Target.RATINGS)}
              onDecrement={handleDecrement(Target.RATINGS)}
            />

            <TextArea
              mt={4}
              value={employerComment}
              onChangeText={(text) => setEmployerComment(text)}
              placeholder="Write your comment about the worker if any ..."
            />
          </VStack>
        </Modal.Body>

        <Modal.Footer>
          <Button isLoading={isLoadingUpdate} variant="unstyled" onPress={isDirty() ? handleSubmit : onClose}>
            {isDirty() ? 'Submit' : 'Close'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AttendanceModal;
