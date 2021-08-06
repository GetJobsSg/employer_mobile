import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, HStack, VStack, Text, Button } from 'native-base';

import { CommonLayout } from 'src/constants/layout';
import { Footer, Header } from 'src/components';

import { formInitialValues } from './forms/formInitialValues';
import { formValidationSchema } from './forms/formValidationSchema';

import DateTimeForm from './forms/date-time-form';
import BasicInfoForm from './forms/basic-info-form';
import RequirementForm from './forms/requirement-form';
import ResponsibilitiesForm from './forms/responsiblity-form';
import LocationForm from './forms/location-form';
import Preview from './forms/preview';

import { jobDetailsActions } from './slice';

enum Step {
  DATETIME_INFO,
  BASIC_INFO,
  REQUIREMENT_INFO,
  RESPONSIBLITY_INFO,
  LOCATION_INFO,
  PREVIEW,
}

const JobDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currStep, setCurrStep] = useState(0);

  const { values, dirty, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: formInitialValues[currStep],
    validationSchema: formValidationSchema[currStep],
    validateOnChange: false,
    onSubmit: (_values) => {
      console.log(_values);
      setCurrStep(currStep + 1);
    },
  });

  const handlePrevStage = () => {
    if (currStep > 0) {
      setCurrStep(currStep - 1);
    }
  };

  const renderFormContent = () => {
    switch (currStep) {
      case Step.DATETIME_INFO:
        return <DateTimeForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case Step.BASIC_INFO:
        return <BasicInfoForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case Step.REQUIREMENT_INFO:
        return <RequirementForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case Step.RESPONSIBLITY_INFO:
        return <ResponsibilitiesForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case Step.LOCATION_INFO:
        return <LocationForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case Step.PREVIEW:
        return <Preview formValues={values} />;

      default:
        return <Text>Form Not Found</Text>;
    }
  };

  const handleExit = () => {
    if (dirty) {
      return Alert.alert('Exit?', 'All the information you have insert will be lost.', [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
    return navigation.goBack();
  };

  const handleCreate = () => {
    dispatch(jobDetailsActions.createJobRequest(values));
  };

  const renderButtonLabel = () => {
    let label = 'Next';
    if (currStep === Step.PREVIEW) {
      label = 'Create';
    }
    if (currStep === Step.LOCATION_INFO) {
      label = 'Preview';
    }

    return (
      <Text fontWeight="500" color="white">
        {label}
      </Text>
    );
  };

  return (
    <VStack flex={1}>
      <Header
        title="Create Job"
        labelRight={
          <Text color="gray.900" underline fontWeight="600" onPress={handleExit}>
            Exit
          </Text>
        }
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} flex={1}>
        <ScrollView px={CommonLayout.containerX} bg="white">
          {renderFormContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer>
        <HStack space={1} alignItems="center">
          {currStep !== Step.DATETIME_INFO && (
            <Button variant="outline" bgColor="white" borderColor="gray.900" borderWidth={2} onPress={handlePrevStage}>
              <Text fontWeight="500" color="black">
                Previous
              </Text>
            </Button>
          )}

          <Button
            variant="outline"
            bgColor="gray.900"
            borderColor="gray.900"
            borderWidth={2}
            flex={1}
            onPress={currStep === Step.PREVIEW ? handleCreate : handleSubmit}
          >
            {renderButtonLabel()}
          </Button>
        </HStack>
      </Footer>
    </VStack>
  );
};

export default JobDetailScreen;
