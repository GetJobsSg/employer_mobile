import React from 'react';
import { FormControl, Input, Text, VStack } from 'native-base';
import { FieldName } from './formInitialValues';

interface RequirementFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const RequirementForm = (props: RequirementFormProps) => {
  const { formValues, formErrors, setFormFieldValue } = props;
  return (
    <VStack bg="white" pt={4} space={6}>
      <FormControl isInvalid={formErrors[FieldName.requirement]}>
        <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
          Requirement
        </Text>
        <Input
          returnKeyType="next"
          value={formValues[FieldName.requirement]}
          multiline
          height={200}
          onChangeText={(descrip) => setFormFieldValue(FieldName.requirement, descrip)}
        />
        {formErrors[FieldName.requirement] && (
          <FormControl.ErrorMessage>{formErrors[FieldName.requirement]}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default RequirementForm;
