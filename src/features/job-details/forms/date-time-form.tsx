import React, { useEffect } from 'react';
import { FormControl, VStack } from 'native-base';
import moment from 'moment';

import { DatePicker } from 'src/components';
import { DD_MMM_YYYY, HH_MM_A } from 'src/constants/dateTime';

import { FieldName } from './formInitialValues';

interface DateTimeFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const DateTimeForm = (props: DateTimeFormProps) => {
  const { formValues, formErrors, setFormFieldValue } = props;

  const startDate = formValues[FieldName.startDate];
  useEffect(() => {}, [startDate]);

  const handleOnChangeTime = (targetField: FieldName.startTime | FieldName.endTime) => (selectedTime: Date) => {
    // date is not selected yet, do not need to proceed add hours / add minutes operation
    const selectedDate = formValues[FieldName.startDate];
    if (!selectedDate) {
      setFormFieldValue(targetField, selectedTime);
      return;
    }

    const hours = moment(selectedTime).hours();
    const mins = moment(selectedTime).minutes();
    const finalSelectedTime = moment(selectedDate).add(hours, 'hours').add(mins, 'minutes').toDate();
    setFormFieldValue(targetField, finalSelectedTime);
    console.info(`selected time ${targetField}: ${moment(finalSelectedTime).format('lll')}`);
  };

  return (
    <VStack py={4}>
      <FormControl isInvalid mb={2}>
        <DatePicker
          label="Date"
          placeholder="Select date"
          selectedDate={formValues[FieldName.startDate]}
          format={DD_MMM_YYYY}
          mode="date"
          onChange={(_startDate) => {
            const targetStartDate = moment(_startDate).startOf('day').toDate();
            console.info('selected date: ', moment(targetStartDate).format('ll'));
            setFormFieldValue(FieldName.startDate, targetStartDate);
            setFormFieldValue(FieldName.endDate, targetStartDate); // only need to cater single date for now, both startDate and endDate will be the same
          }}
        />
        <FormControl.ErrorMessage>{formErrors[FieldName.startDate]}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid mb={2}>
        <DatePicker
          label="Start Time"
          placeholder="Select start time"
          selectedDate={formValues[FieldName.startTime]}
          format={HH_MM_A}
          mode="time"
          onChange={handleOnChangeTime(FieldName.startTime)}
        />
        <FormControl.ErrorMessage>{formErrors[FieldName.startTime]}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid mb={2}>
        <DatePicker
          label="End Time"
          placeholder="Select end time"
          selectedDate={formValues[FieldName.endTime]}
          format={HH_MM_A}
          mode="time"
          onChange={handleOnChangeTime(FieldName.endTime)}
        />
        <FormControl.ErrorMessage>{formErrors[FieldName.endTime]}</FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default DateTimeForm;
