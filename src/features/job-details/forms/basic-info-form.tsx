import React, { useRef, useState } from 'react';
import { FormControl, Text, Input, VStack, Pressable, HStack } from 'native-base';
import { Picker } from '@react-native-picker/picker';
import { FieldName } from './formInitialValues';

interface BasicInfoFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const BasicInfoForm = (props: BasicInfoFormProps) => {
  const categoryPickerRef = useRef<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const { formValues, formErrors, setFormFieldValue } = props;

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

        <FormControl isInvalid mb={8}>
          <Pressable onPress={() => {}}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                Job Category
              </Text>
              <HStack justifyContent="space-between">
                <Text>Select Category</Text>
              </HStack>
            </VStack>
          </Pressable>
          <FormControl.ErrorMessage>{formErrors[FieldName.endTime]}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid mb={8}>
          {/* <Pressable onPress={() => {}}>
            <VStack>
              <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
                Job Category
              </Text>
              <HStack justifyContent="space-between">
                <Text>Select Category</Text>
              </HStack>
            </VStack>
          </Pressable> */}
          <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
            Job Category
          </Text>
          <Picker
            ref={categoryPickerRef}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <FormControl.ErrorMessage>{formErrors[FieldName.endTime]}</FormControl.ErrorMessage>
        </FormControl>
      </VStack>
    </>
  );
};

export default BasicInfoForm;
