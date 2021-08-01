import React from 'react';
import { FormControl, Input, Text, VStack } from 'native-base';
import { FieldName } from './formInitialValues';

interface ResponsibilityFormProps {
  formValues: any;
  formErrors: any;
  setFormFieldValue: any;
}

const ResponsibilitiesForm = (props: ResponsibilityFormProps) => {
  const { formValues, formErrors, setFormFieldValue } = props;
  return (
    <VStack bg="white" pt={4} space={6}>
      <FormControl isInvalid={formErrors[FieldName.responsiblities]}>
        <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
          Responsibilities
        </Text>
        <Input
          returnKeyType="next"
          value={formValues[FieldName.responsiblities]}
          multiline
          height={200}
          onChangeText={(resp) => setFormFieldValue(FieldName.responsiblities, resp)}
        />
        {formErrors[FieldName.responsiblities] && (
          <FormControl.ErrorMessage>{formErrors[FieldName.responsiblities]}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default ResponsibilitiesForm;
