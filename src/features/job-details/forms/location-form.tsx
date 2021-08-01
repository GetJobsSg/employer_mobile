import { FormControl, Input, Text, VStack } from 'native-base';
import React from 'react';
import { FieldName } from './formInitialValues';

interface LocationFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const LocationForm = (props: LocationFormProps) => {
  const { formValues, formErrors, setFormFieldValue } = props;
  return (
    <VStack bg="white" pt={4} space={6}>
      <FormControl isInvalid={formErrors[FieldName.address]}>
        <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
          Address
        </Text>
        <Input
          value={formValues[FieldName.address]}
          onChangeText={(text) => setFormFieldValue(FieldName.address, text)}
        />
        {formErrors[FieldName.address] && (
          <FormControl.ErrorMessage>{formErrors[FieldName.address]}</FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formErrors[FieldName.blockNo]}>
        <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
          Block No
        </Text>
        <Input
          value={formValues[FieldName.blockNo]}
          onChangeText={(text) => setFormFieldValue(FieldName.blockNo, text)}
        />
        {formErrors[FieldName.blockNo] && (
          <FormControl.ErrorMessage>{formErrors[FieldName.blockNo]}</FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formErrors[FieldName.unitNo]}>
        <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
          Unit No
        </Text>
        <Input
          value={formValues[FieldName.unitNo]}
          keyboardType="numbers-and-punctuation"
          onChangeText={(text) => setFormFieldValue(FieldName.unitNo, text)}
        />
        {formErrors[FieldName.unitNo] && (
          <FormControl.ErrorMessage>{formErrors[FieldName.unitNo]}</FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formErrors[FieldName.postalCode]}>
        <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
          Postal Code
        </Text>
        <Input
          keyboardType="number-pad"
          value={formValues[FieldName.postalCode]}
          onChangeText={(text) => setFormFieldValue(FieldName.postalCode, text)}
        />
        {formErrors[FieldName.postalCode] && (
          <FormControl.ErrorMessage>{formErrors[FieldName.postalCode]}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default LocationForm;
