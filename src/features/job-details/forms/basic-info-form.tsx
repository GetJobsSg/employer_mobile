import React, { useEffect, useMemo } from 'react';
import { FormControl, Text, Input, VStack } from 'native-base';
import { Picker } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { FieldName } from './formInitialValues';

import { jobDetailsActions } from '../slice';

interface BasicInfoFormProps {
  isEditMode: boolean;
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const BasicInfoForm = (props: BasicInfoFormProps) => {
  const dispatch = useAppDispatch();
  const { allCategories, isLoadingGetAllCategories, allDresscode, isLoadingGetAllDresscode } = useAppSelector(
    (state) => state.jobDetails,
  );
  const { isEditMode, formValues, formErrors, setFormFieldValue } = props;

  useEffect(() => {
    if (allCategories.length === 0) {
      dispatch(jobDetailsActions.getAllCategoriesRequest());
    }

    if (allDresscode.length === 0) {
      dispatch(jobDetailsActions.getAllDresscodeRequest());
    }
  }, [allCategories.length, allDresscode.length, dispatch]);

  const handleCategorySelect = (selectedOption: any) => {
    setFormFieldValue(FieldName.category, selectedOption);
  };

  const handleDresscodeSelect = (selectedOption: any) => {
    setFormFieldValue(FieldName.dresscode, selectedOption);
  };

  const categoryOptionList = useMemo(() => allCategories.map((c) => ({ label: c.name, value: c.id })), [allCategories]);

  const dresscodeOptionList = useMemo(() => allDresscode.map((d) => ({ label: d.name, value: d.id })), [allDresscode]);

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
            height={70}
            value={formValues[FieldName.jobDescription]}
            onChangeText={(descrip) => setFormFieldValue(FieldName.jobDescription, descrip)}
          />
          {formErrors[FieldName.jobDescription] && (
            <FormControl.ErrorMessage>{formErrors[FieldName.jobDescription]}</FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={formErrors[FieldName.hourlyRate]}>
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Hourly Rate
          </Text>
          <Input
            isDisabled={isEditMode}
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

        <FormControl isInvalid={formErrors[FieldName.vacancy]}>
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Vacancy
          </Text>
          <Input
            returnKeyType="done"
            value={formValues[FieldName.vacancy]}
            keyboardType="number-pad"
            onChangeText={(vacancyNo) => setFormFieldValue(FieldName.vacancy, vacancyNo)}
          />
          {formErrors[FieldName.vacancy] && (
            <FormControl.ErrorMessage>{formErrors[FieldName.vacancy]}</FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid mb={2}>
          <Picker
            label="Category"
            isLoading={isLoadingGetAllCategories}
            selectedValue={formValues[FieldName.category]}
            onChange={handleCategorySelect}
            options={categoryOptionList}
          />
          <FormControl.ErrorMessage>{formErrors[FieldName.category]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid mb={100}>
          <Picker
            label="Dresscode"
            isLoading={isLoadingGetAllDresscode}
            selectedValue={formValues[FieldName.dresscode]}
            onChange={handleDresscodeSelect}
            options={dresscodeOptionList}
          />
          <FormControl.ErrorMessage>{formErrors[FieldName.category]}</FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </>
  );
};

export default BasicInfoForm;
