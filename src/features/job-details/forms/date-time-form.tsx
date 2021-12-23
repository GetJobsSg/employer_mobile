import React from 'react';
import { FormControl, VStack } from 'native-base';

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
            setFormFieldValue(FieldName.startDate, _startDate);
            setFormFieldValue(FieldName.endDate, _startDate); // only need to cater single date for now, both startDate and endDate will be the same
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
          onChange={(_startTime) => setFormFieldValue(FieldName.startTime, _startTime)}
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
          onChange={(_endTime) => setFormFieldValue(FieldName.endTime, _endTime)}
        />
        <FormControl.ErrorMessage>{formErrors[FieldName.endTime]}</FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default DateTimeForm;
