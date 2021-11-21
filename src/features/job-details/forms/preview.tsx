import moment from 'moment';
import { VStack, Text, HStack } from 'native-base';
import React, { useMemo } from 'react';
import { DD_MMM_YYYY, HH_MM_A } from 'src/constants/dateTime';
import { getCalendarDay } from 'src/utils/dateTime';
import { useAppSelector } from 'src/hooks';
import { FieldName, FormStep } from './formInitialValues';

interface ISectionProps {
  children: React.ReactElement | React.ReactElement[];
  title: string;
  onEdit: () => void;
}

const Section = (props: ISectionProps) => {
  const { children, title, onEdit } = props;
  return (
    <VStack borderWidth={1} borderColor="gray.100" borderRadius={10} mb={6}>
      <HStack
        flex={1}
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        justifyContent="space-between"
      >
        <Text pl={4} fontWeight="600" fontSize="sm">
          {title}
        </Text>
        <Text onPress={onEdit} fontSize="sm" color="blue.400" px={6} py={3}>
          Edit
        </Text>
      </HStack>
      <VStack px={4} pt={4}>
        {children}
      </VStack>
    </VStack>
  );
};

interface IPreviewItemProps {
  label: string;
  value: string;
}
const PreviewItem = (props: IPreviewItemProps) => {
  const { label, value } = props;
  return (
    <VStack mb={4}>
      <Text fontSize="xs" mb={1} color="gray.500">
        {label}
      </Text>
      <Text fontSize="md" fontWeight="500" mb={1}>
        {value}
      </Text>
    </VStack>
  );
};

interface IPreviewProps {
  formValues: any;
  handleSectionEdit: (step: number) => void;
}

const Preview = (props: IPreviewProps) => {
  const { formValues, handleSectionEdit } = props;
  const { allDresscode, allCategories } = useAppSelector((state) => state.jobDetails);

  const selectedDresscode = useMemo(() => {
    const dress = allDresscode.find((d) => d.id === formValues[FieldName.dresscode]);
    return dress?.name || '';
  }, [allDresscode, formValues]);

  const selectedCategory = useMemo(() => {
    const category = allCategories.find((c) => c.id === formValues[FieldName.category]);
    return category?.name || '';
  }, [allCategories, formValues]);

  const getJobDate = () =>
    `${moment(formValues[FieldName.startDate]).format(DD_MMM_YYYY)} (${getCalendarDay(
      formValues[FieldName.startDate],
    )})`;

  const onSectionEdit = (stepId: FormStep) => handleSectionEdit(stepId);

  return (
    <VStack bg="white" pt={4}>
      <Section title="Datetime" onEdit={() => onSectionEdit(FormStep.DATETIME_INFO)}>
        <PreviewItem label="Date" value={getJobDate()} />
        <PreviewItem label="Start Time" value={moment(formValues[FieldName.startTime]).format(HH_MM_A)} />
        <PreviewItem label="End Time" value={moment(formValues[FieldName.endTime]).format(HH_MM_A)} />
      </Section>

      <Section title="Basic Info" onEdit={() => onSectionEdit(FormStep.BASIC_INFO)}>
        <PreviewItem label="Job Title" value={formValues[FieldName.jobTitle]} />
        <PreviewItem label="Job Description" value={formValues[FieldName.jobDescription]} />
        <PreviewItem label="Hourly Rate" value={`$${formValues[FieldName.hourlyRate]} / hour`} />
        <PreviewItem label="Category" value={selectedCategory} />
        <PreviewItem label="Dresscode" value={selectedDresscode} />
      </Section>

      <Section title="Requirement" onEdit={() => onSectionEdit(FormStep.REQUIREMENT_INFO)}>
        <PreviewItem label="Requirement" value={formValues[FieldName.requirement]} />
      </Section>

      <Section title="Responsibilities" onEdit={() => onSectionEdit(FormStep.RESPONSIBLITY_INFO)}>
        <PreviewItem label="Responsibilities" value={formValues[FieldName.responsiblities]} />
      </Section>

      <Section title="Location" onEdit={() => onSectionEdit(FormStep.LOCATION_INFO)}>
        <PreviewItem label="Address" value={formValues[FieldName.address]} />
        <PreviewItem label="Block No" value={formValues[FieldName.blockNo]} />
        <PreviewItem label="Unit No" value={formValues[FieldName.unitNo]} />
        <PreviewItem label="Postal Code" value={formValues[FieldName.postalCode]} />
      </Section>
    </VStack>
  );
};

export default Preview;
