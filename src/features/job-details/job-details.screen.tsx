import React, { useState } from 'react';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAvoidingView, ScrollView, HStack, VStack, Text, Button } from 'native-base';

import { CommonLayout } from 'src/constants/layout';
import { Footer, Header } from 'src/components';
import { IconSize } from 'src/constants/icons';

import { formInitialValues } from './forms/formInitialValues';
import { formValidationSchema } from './forms/formValidationSchema';
import DateTimeForm from './forms/date-time-form';

// const ArrowRight = () => <Icon as={Ionicons} name="ios-chevron-forward" size={5} ml={4} color="gray.400" />;

const JobDetailScreen = () => {
  const [currStep, setCurrStep] = useState(0);

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: formInitialValues[currStep],
    validationSchema: formValidationSchema[currStep],
    onSubmit: (_values) => {
      console.log(_values);
      setCurrStep(currStep + 1);
    },
  });

  const renderFormContent = () => {
    switch (currStep) {
      case 0:
        return (
          <DateTimeForm
            formValues={values}
            formErrors={errors}
            setFormFieldValue={(fieldName, fieldVal) => {
              setFieldValue(fieldName, fieldVal);
            }}
          />
        );

      case 1:
        return <Text>Todo - Basic Form</Text>;

      case 2:
        return <Text>Preview all</Text>;

      default:
        return <Text>Form Not Found</Text>;
    }
  };

  return (
    <VStack flex={1}>
      <Header
        iconLeft={<Ionicons name="chevron-back-outline" size={IconSize.lg} onPress={() => {}} />}
        title="Create Job"
      />
      <KeyboardAvoidingView behavior="padding" flex={1}>
        <ScrollView px={CommonLayout.containerX} bg="white">
          {renderFormContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer>
        <HStack space={1}>
          <Button onPress={handleSubmit}>Back</Button>
          <Button flex={1} onPress={handleSubmit}>
            Next
          </Button>
        </HStack>
      </Footer>
    </VStack>
  );

  // return (
  //   <VStack flex={1}>
  //     <StatusBar barStyle="dark-content" />
  //     <Header
  //       iconLeft={<Ionicons name="chevron-back-outline" size={IconSize.lg} onPress={() => {}} />}
  //       title="Create Job"
  //     />
  //     <SelectDateTimeForm />
  //   </VStack>
  // );
};

// return (
//   <>
//     <Header
//       iconLeft={<Ionicons name="chevron-back-outline" size={IconSize.lg} onPress={() => {}} />}
//       iconRight={[
//         <Ionicons name="ellipsis-vertical-sharp" size={IconSize.md} onPress={() => console.log('clicked1')} />,
//         <Ionicons name="ellipsis-vertical-sharp" size={IconSize.md} onPress={() => console.log('clicked2')} />,
//       ]}
//       title="Create Job"
//     />

//     <KeyboardAvoidingView behavior="padding" flex={1}>
//       <ScrollView px={CommonLayout.containerX} bg="white">
//         <FormControl isInvalid mb={8}>
//           <Pressable onPress={() => jobDateRef.current.open()}>
//             <VStack>
//               <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//                 Date
//               </Text>
//               <HStack justifyContent="space-between">
//                 {jobDate && (
//                   <Text fontSize="lg" color="gray.600" fontWeight="bold">
//                     {`${moment(jobDate).format(DD_MMM_YYYY)} (${getCalendarDay(jobDate)})`}
//                   </Text>
//                 )}
//                 {!jobDate && (
//                   <Text fontSize="lg" color="gray.400" fontWeight="bold">
//                     Select Date
//                   </Text>
//                 )}
//                 <ArrowRight />
//               </HStack>
//             </VStack>
//           </Pressable>
//           <FormControl.ErrorMessage>Please select a date...</FormControl.ErrorMessage>
//         </FormControl>

//         <FormControl mb={8}>
//           <Pressable onPress={() => startTimeRef.current.open()}>
//             <VStack>
//               <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//                 Start Time
//               </Text>
//               <HStack justifyContent="space-between">
//                 {startTime && (
//                   <Text fontSize="lg" color="gray.600" fontWeight="bold">
//                     {moment(startTime).format(HH_MM_A)}
//                   </Text>
//                 )}
//                 {!startTime && (
//                   <Text fontSize="lg" color="gray.400" fontWeight="bold">
//                     Select Time
//                   </Text>
//                 )}
//                 <ArrowRight />
//               </HStack>
//             </VStack>
//           </Pressable>
//         </FormControl>

//         <FormControl mb={8}>
//           <Pressable onPress={() => endTimeRef.current.open()}>
//             <VStack>
//               <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//                 End Time
//               </Text>
//               <HStack justifyContent="space-between">
//                 {endTime && (
//                   <Text fontSize="lg" color="gray.600" fontWeight="bold">
//                     {moment(endTime).format(HH_MM_A)}
//                   </Text>
//                 )}
//                 {!endTime && (
//                   <Text fontSize="lg" color="gray.400" fontWeight="bold">
//                     Select Time
//                   </Text>
//                 )}
//                 <ArrowRight />
//               </HStack>
//             </VStack>
//           </Pressable>
//         </FormControl>

//         {/* <FormControl>
//           <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//             Job Title
//           </Text>
//           <TextField />
//         </FormControl>

//         <FormControl mb={4}>
//           <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
//             Job Description
//           </Text>
//           <TextArea placeholder="Job Description" />
//         </FormControl>

//         <FormControl>
//           <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
//             Hourly Rate
//           </Text>
//           <TextField keyboardType="decimal-pad" placeholder="Hourly Rate" />
//         </FormControl>

//         <FormControl mb={4}>
//           <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
//             Job Responsibilities
//           </Text>
//           <TextArea placeholder="Job Description" />
//         </FormControl>

//         <FormControl mb={4}>
//           <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.600">
//             Job Requirements
//           </Text>
//           <TextArea placeholder="Job Description" />
//         </FormControl>

//         <FormControl>
//           <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//             Job Title
//           </Text>
//           <TextField />
//         </FormControl>

//         <FormControl>
//           <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//             Job Title
//           </Text>
//           <TextField />
//         </FormControl>

//         <FormControl>
//           <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//             Job Title
//           </Text>
//           <TextField />
//         </FormControl>

//         <FormControl>
//           <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//             Job Title
//           </Text>
//           <TextField />
//         </FormControl>

//         <FormControl>
//           <Text fontSize="xs" mb={1} color="gray.400" fontWeight="500">
//             Job Title
//           </Text>
//           <TextField />
//         </FormControl> */}
//       </ScrollView>
//     </KeyboardAvoidingView>

//     <Footer>
//       <Button>Next</Button>
//     </Footer>

//     <RBSheet customStyles={{}} ref={jobDateRef}>
//       <DatePicker
//         mode="date"
//         minimumDate={jobDate}
//         date={jobDate || new Date()}
//         onDateChange={(date) => setJobDate(date)}
//       />
//     </RBSheet>

//     <RBSheet ref={startTimeRef}>
//       <DatePicker
//         mode="time"
//         minuteInterval={15}
//         date={startTime || new Date()}
//         onDateChange={(time) => setStartTime(time)}
//       />
//     </RBSheet>

//     <RBSheet ref={endTimeRef}>
//       <DatePicker
//         mode="time"
//         minuteInterval={15}
//         date={endTime || new Date()}
//         onDateChange={(time) => setEndTime(time)}
//       />
//     </RBSheet>
//   </>
// );
export default JobDetailScreen;
