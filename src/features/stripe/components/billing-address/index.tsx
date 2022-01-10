export {};
// import React, { useEffect } from 'react';
// import { Platform } from 'react-native';
// import {
//   Button,
//   Center,
//   Icon,
//   Spinner,
//   Text,
//   VStack,
//   FormControl,
//   Input,
//   KeyboardAvoidingView,
//   ScrollView,
// } from 'native-base';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { Header } from 'src/components';
// import { useAppDispatch, useAppSelector } from 'src/hooks';

// // import { BillingAddressScreenProps } from './types';
// import { stripeActions } from '../../slice';

// const formSchema = yup.object({
//   name: yup.string().required('Please insert your name'),
//   email: yup.string().required('Please insert your email'),
//   address: yup.string().required('Please insert your address'),
//   unitNo: yup.string().required('Please insert your unit no'),
//   blockNo: yup.string().required('Please insert your block no'),
//   postalCode: yup.string().required('Please insert your postal code'),
//   country: yup.string().required('Please insert your country'),
// });

// const BillingAddressScreen = () => {
//   const dispatch = useAppDispatch();
//   const { isLoadingBillingAddress, isLoadingBillingAddressUpdate, billingAddress } = useAppSelector(
//     (state) => state.stripePayment,
//   );
//   const navigation = useNavigation();

//   const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
//     initialValues: {
//       name: billingAddress?.name || '',
//       email: billingAddress?.email || '',
//       address: billingAddress?.address || '',
//       unitNo: billingAddress?.unitNo || '',
//       blockNo: billingAddress?.blockNo || '',
//       postalCode: billingAddress?.postalCode || '',
//       country: billingAddress?.country || 'Singapore',
//     },
//     enableReinitialize: true,
//     validationSchema: formSchema,
//     onSubmit: (formValues) => {
//       dispatch(stripeActions.updateBillingAddressRequest(formValues));
//     },
//   });

//   useEffect(() => {
//     dispatch(stripeActions.getBillingAddressRequest());
//   }, [dispatch]);

//   if (isLoadingBillingAddress) {
//     return (
//       <Center flex={1} bg="white">
//         <Spinner size="sm" />
//       </Center>
//     );
//   }

//   return (
//     <VStack flex={1}>
//       <Header
//         title="Billing Address"
//         iconLeft={<Icon as={Ionicons} name="chevron-back-outline" onPress={() => navigation.goBack()} />}
//       />
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} flex={1}>
//         <ScrollView bg="white" px={4}>
//           <VStack space={4}>
//             <FormControl mt={4} isInvalid={!!(touched.name && errors.name)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Name
//               </Text>
//               <Input
//                 value={values.name}
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('name', text)}
//               />
//               <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
//             </FormControl>

//             <FormControl isInvalid={!!(touched.email && errors.email)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Email
//               </Text>
//               <Input
//                 value={values.email}
//                 keyboardType="email-address"
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('email', text)}
//               />
//               <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
//             </FormControl>

//             <FormControl isInvalid={!!(touched.address && errors.address)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Address
//               </Text>
//               <Input
//                 value={values.address}
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('address', text)}
//               />
//               <FormControl.ErrorMessage>{errors.address}</FormControl.ErrorMessage>
//             </FormControl>

//             <FormControl isInvalid={!!(touched.unitNo && errors.unitNo)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Unit No
//               </Text>
//               <Input
//                 value={values.unitNo}
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('unitNo', text)}
//               />
//               <FormControl.ErrorMessage>{errors.unitNo}</FormControl.ErrorMessage>
//             </FormControl>

//             <FormControl isInvalid={!!(touched.blockNo && errors.blockNo)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Block No
//               </Text>
//               <Input
//                 value={values.blockNo}
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('blockNo', text)}
//               />
//               <FormControl.ErrorMessage>{errors.blockNo}</FormControl.ErrorMessage>
//             </FormControl>

//             <FormControl isInvalid={!!(touched.postalCode && errors.postalCode)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Postal Code
//               </Text>
//               <Input
//                 value={values.postalCode}
//                 keyboardType="number-pad"
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('postalCode', text)}
//               />
//               <FormControl.ErrorMessage>{errors.postalCode}</FormControl.ErrorMessage>
//             </FormControl>

//             <FormControl isInvalid={!!(touched.country && errors.country)}>
//               <Text fontSize="xs" mb={1} color="gray.400">
//                 Country
//               </Text>
//               <Input
//                 isDisabled
//                 value={values.country}
//                 borderRadius={0}
//                 borderWidth={2}
//                 onChangeText={(text) => setFieldValue('country', text)}
//               />
//               <FormControl.ErrorMessage>{errors.country}</FormControl.ErrorMessage>
//             </FormControl>

//             <Button
//               variant="outline"
//               bgColor="gray.900"
//               borderColor="gray.900"
//               borderWidth={2}
//               onPress={handleSubmit}
//               disabled={isLoadingBillingAddressUpdate}
//               isLoading={isLoadingBillingAddressUpdate}
//             >
//               <Text fontWeight="500" color="white">
//                 Done
//               </Text>
//             </Button>
//           </VStack>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </VStack>
//   );
// };

// export default BillingAddressScreen;
