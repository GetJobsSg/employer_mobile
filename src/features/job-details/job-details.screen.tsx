import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, HStack, VStack, Text, Button, Icon } from 'native-base';

import { CommonLayout } from 'src/constants/layout';
import { Footer, Header } from 'src/components';

import { useAppSelector, useCheckSuccess } from 'src/hooks';
import { RootStackParams } from 'src/navigator/types';
import { RouteName } from 'src/navigator/route';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formInitialValues, FormStep } from './forms/formInitialValues';
import { formValidationSchema } from './forms/formValidationSchema';

import DateTimeForm from './forms/date-time-form';
import BasicInfoForm from './forms/basic-info-form';
import RequirementForm from './forms/requirement-form';
import ResponsibilitiesForm from './forms/responsiblity-form';
import LocationForm from './forms/location-form';
import Preview from './forms/preview';

import { jobDetailsActions } from './slice';

const JobDetailScreen = () => {
  const dispatch = useDispatch();
  const { isLoadingCreateJob, errorCreateJob } = useAppSelector((state) => state.jobDetails);

  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParams, RouteName.JOB_DETAILS>>();
  const { mode, jobId } = params;

  useEffect(() => {
    if (mode === 'preview' && jobId) {
      dispatch(jobDetailsActions.getJobDetailsRequest({ jobId }));
    }
  }, [dispatch, mode, jobId]);

  const [currStep, setCurrStep] = useState(mode === 'create' ? FormStep.DATETIME_INFO : FormStep.PREVIEW);

  const { values, dirty, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema[currStep],
    validateOnChange: false,
    onSubmit: () => {
      setCurrStep(currStep + 1);
    },
  });

  // successfully created job
  const successCreateJob = useCheckSuccess({ loadingState: isLoadingCreateJob, error: errorCreateJob });
  useEffect(() => {
    if (successCreateJob) {
      navigation.goBack();
    }
  }, [navigation, successCreateJob]);

  const handlePrevStage = () => {
    if (currStep > 0) {
      setCurrStep(currStep - 1);
    }
  };

  const renderFormContent = () => {
    switch (currStep) {
      case FormStep.DATETIME_INFO:
        return <DateTimeForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case FormStep.BASIC_INFO:
        return <BasicInfoForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case FormStep.REQUIREMENT_INFO:
        return <RequirementForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case FormStep.RESPONSIBLITY_INFO:
        return <ResponsibilitiesForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case FormStep.LOCATION_INFO:
        return <LocationForm formValues={values} formErrors={errors} setFormFieldValue={setFieldValue} />;

      case FormStep.PREVIEW:
        return <Preview formValues={values} handleSectionEdit={(stepId) => setCurrStep(stepId)} />;

      default:
        return <Text>Form Not Found</Text>;
    }
  };

  const handleClose = () => {
    if (dirty) {
      return Alert.alert('Exit Job Creation', 'All the information you have insert will be discarded.', [
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
    if (currStep === FormStep.PREVIEW) {
      label = 'Create';
    }
    if (currStep === FormStep.LOCATION_INFO) {
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
      <Header title="Create Job" iconLeft={<Icon as={Ionicons} name="close-outline" onPress={handleClose} />} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} flex={1}>
        <ScrollView px={CommonLayout.containerX} bg="white">
          {renderFormContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer>
        <HStack space={1} alignItems="center">
          {currStep !== FormStep.DATETIME_INFO && (
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
            isLoading={isLoadingCreateJob}
            onPress={currStep === FormStep.PREVIEW ? handleCreate : handleSubmit}
          >
            {renderButtonLabel()}
          </Button>
        </HStack>
      </Footer>
    </VStack>
  );
};

export default JobDetailScreen;
