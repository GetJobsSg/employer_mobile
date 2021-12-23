import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, HStack, VStack, Text, Button, Icon, Spinner } from 'native-base';

import { CommonLayout } from 'src/constants/layout';
import { Footer, Header } from 'src/components';

import { useAppSelector, useCheckSuccess } from 'src/hooks';
import { RootStackParams } from 'src/navigator/types';
import { RouteName } from 'src/navigator/route';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormStep, defaultFormInitialValues, formInitialValuesFromDb } from './forms/formInitialValues';
import { formValidationSchema } from './forms/formValidationSchema';

import DateTimeForm from './forms/date-time-form';
import BasicInfoForm from './forms/basic-info-form';
import LocationForm from './forms/location-form';
import Preview from './forms/preview';

import { jobDetailsActions } from './slice';

const JobDetailScreen = () => {
  const dispatch = useDispatch();
  const { info, isLoadingCreateJob, isLoadingUpdateJob, isLoadingGetJobDetails, errorCreateJob, errorUpdateJob } =
    useAppSelector((state) => state.jobDetails);

  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParams, RouteName.JOB_DETAILS>>();
  const { mode, jobId } = params;

  const isCreateMode = mode === 'create';
  const isEditMode = mode === 'edit';
  const isPreviewMode = mode === 'preview';

  const [currStep, setCurrStep] = useState(FormStep.DATETIME_INFO);

  const {
    values,
    dirty,
    errors,
    handleSubmit: handleNextStep,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: isCreateMode ? defaultFormInitialValues : formInitialValuesFromDb(info),
    validationSchema: formValidationSchema[currStep],
    validateOnChange: false,
    onSubmit: () => {
      setCurrStep(currStep + 1);
    },
  });

  // load job details if it is 'edit' or 'preview' mode
  useEffect(() => {
    if (isEditMode) {
      dispatch(jobDetailsActions.getJobDetailsRequest({ jobId: Number(jobId) }));
    }
  }, [dispatch, isEditMode, jobId]);

  const successCreateJob = useCheckSuccess({ loadingState: isLoadingCreateJob, error: errorCreateJob });
  const successUpdateJob = useCheckSuccess({ loadingState: isLoadingUpdateJob, error: errorUpdateJob });

  useEffect(() => {
    if (successCreateJob || successUpdateJob) {
      navigation.goBack();
    }
  }, [navigation, successCreateJob, successUpdateJob]);

  const handlePrevStage = () => {
    if (currStep > 0) {
      setCurrStep(currStep - 1);
    }
  };

  const renderFormContent = () => {
    switch (currStep) {
      case FormStep.DATETIME_INFO:
        return (
          <DateTimeForm
            isEditMode={isEditMode}
            formValues={values}
            formErrors={errors}
            setFormFieldValue={setFieldValue}
          />
        );

      case FormStep.BASIC_INFO:
        return (
          <BasicInfoForm
            isEditMode={isEditMode}
            formValues={values}
            formErrors={errors}
            setFormFieldValue={setFieldValue}
          />
        );

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

  const handleCreateOrUpdate = () => {
    if (isEditMode) {
      dispatch(jobDetailsActions.updateJobDetailsRequest({ jobId, data: values }));
    } else {
      dispatch(jobDetailsActions.createJobRequest(values));
    }
  };

  const renderButtonLabel = () => {
    let label = 'Next';
    if (currStep === FormStep.PREVIEW) {
      label = isEditMode ? 'Update' : 'Create';
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

  const getHeaderTitle = () => {
    if (isCreateMode) return 'Create Job';
    if (isEditMode) return 'Edit Job Info';
    return 'Job Details';
  };

  if (!isCreateMode && !isEditMode && !isPreviewMode) return null;

  if (isLoadingGetJobDetails)
    return (
      <VStack flex={1} justifyContent="center">
        <Spinner size="sm" />
      </VStack>
    );

  return (
    <VStack flex={1}>
      <Header title={getHeaderTitle()} iconLeft={<Icon as={Ionicons} name="close-outline" onPress={handleClose} />} />
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
            isLoading={isLoadingCreateJob || isLoadingUpdateJob}
            onPress={currStep === FormStep.PREVIEW ? handleCreateOrUpdate : handleNextStep}
          >
            {renderButtonLabel()}
          </Button>
        </HStack>
      </Footer>
    </VStack>
  );
};

export default JobDetailScreen;
