import moment from 'moment';
import { VStack, Text, Divider } from 'native-base';
import React from 'react';
import { DD_MMM_YYYY, HH_MM_A } from 'src/constants/dateTime';
import { getCalendarDay } from 'src/utils/dateTime';
import { FieldName } from './formInitialValues';

interface IPreviewItem {
  label: string;
  value: string;
}
const PreviewItem = (props: IPreviewItem) => {
  const { label, value } = props;
  return (
    <VStack mb={4}>
      <Text fontSize="sm" mb={1} color="gray.500">
        {label}
      </Text>
      <Text fontSize="md" fontWeight="500" mb={1} color="gray.900">
        {value}
      </Text>
    </VStack>
  );
};

interface IPreviewProps {
  formValues: any;
}

const Preview = (props: IPreviewProps) => {
  const { formValues } = props;

  return (
    <VStack bg="white" pt={4}>
      <PreviewItem
        label="Date"
        value={`${moment(formValues[FieldName.startDate]).format(DD_MMM_YYYY)} (${getCalendarDay(
          formValues[FieldName.startDate],
        )})`}
      />
      <PreviewItem label="Start Time" value={moment(formValues[FieldName.startTime]).format(HH_MM_A)} />
      <PreviewItem label="End Time" value={moment(formValues[FieldName.endTime]).format(HH_MM_A)} />

      <Divider orientation="horizontal" my={4} />

      <PreviewItem label="Job Title" value={formValues[FieldName.jobTitle]} />
      <PreviewItem label="Job Description" value={formValues[FieldName.jobDescription]} />
      <PreviewItem label="Hourly Rate" value={`$${formValues[FieldName.hourlyRate]} / hour`} />

      <Divider orientation="horizontal" my={4} />

      <PreviewItem label="Requirement" value={formValues[FieldName.requirement]} />

      <Divider orientation="horizontal" my={4} />

      <PreviewItem label="Responsibilities" value={formValues[FieldName.responsiblities]} />

      <Divider orientation="horizontal" my={4} />

      <PreviewItem label="Address" value={formValues[FieldName.address]} />
      <PreviewItem label="Block No" value={formValues[FieldName.blockNo]} />
      <PreviewItem label="Unit No" value={formValues[FieldName.unitNo]} />
      <PreviewItem label="Postal Code" value={formValues[FieldName.postalCode]} />
    </VStack>
  );
};

export default Preview;
