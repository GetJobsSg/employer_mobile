import React, { useEffect, useMemo } from 'react';
import { FormControl, Text, Input, VStack } from 'native-base';
import { Picker } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { FieldName } from './formInitialValues';

import { jobDetailsActions } from '../slice';

interface BasicInfoFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const BasicInfoForm = (props: BasicInfoFormProps) => {
  const dispatch = useAppDispatch();
  const { allCategories } = useAppSelector((state) => state.jobDetails);
  const { formValues, formErrors, setFormFieldValue } = props;

  useEffect(() => {
    dispatch(jobDetailsActions.getAllCategoriesRequest());
  }, [dispatch]);

  const handleCategorySelect = (selectedOption: any) => {
    setFormFieldValue(FieldName.category, selectedOption);
  };

  const categoryOptionList = useMemo(() => allCategories.map((c) => ({ label: c.name, value: c.id })), [allCategories]);

  return (
    <>
      <VStack bg="white" pt={4} space={6}>
        <FormControl isInvalid={formErrors[FieldName.jobTitle]}>
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Job Title
          </Text>
          <Input
            value={formValues[FieldName.jobTitle]}
            onChangeText={(text) => setFormFieldValue(FieldName.jobTitle, text)}
          />
          {formErrors[FieldName.jobTitle] && (
            <FormControl.ErrorMessage>{formErrors[FieldName.jobTitle]}</FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={formErrors[FieldName.jobDescription]}>
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Job Description
          </Text>
          <Input
            textAlignVertical="top"
            multiline
            returnKeyType="next"
            height={200}
            value={formValues[FieldName.jobDescription]}
            onChangeText={(descrip) => setFormFieldValue(FieldName.jobDescription, descrip)}
          />
          {formErrors[FieldName.jobDescription] && (
            <FormControl.ErrorMessage>{formErrors[FieldName.jobDescription]}</FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={formErrors[FieldName.hourlyRate]} mb={4}>
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Hourly Rate
          </Text>
          <Input
            returnKeyType="done"
            value={formValues[FieldName.hourlyRate]}
            keyboardType="decimal-pad"
            onChangeText={(amount) => {
              const decimalVal = amount.split('.')[1];
              // user can input maximum 2 number after decimal point
              // TODO: need a separate component to have a better pricing input experience
              if (amount && decimalVal && decimalVal.length > 2) {
                return;
              }
              setFormFieldValue(FieldName.hourlyRate, amount);
            }}
          />
          {formErrors[FieldName.hourlyRate] && (
            <FormControl.ErrorMessage>{formErrors[FieldName.hourlyRate]}</FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid mb={2}>
          <Picker
            label="Category"
            selectedValue={formValues[FieldName.category]}
            onChange={handleCategorySelect}
            options={categoryOptionList}
          />
          <FormControl.ErrorMessage>{formErrors[FieldName.category]}</FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </>
  );
};

export default BasicInfoForm;
