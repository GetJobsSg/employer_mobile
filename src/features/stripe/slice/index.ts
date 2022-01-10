export {};
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ConfirmSetupIntentError, StripeError } from '@stripe/stripe-react-native';
// import stripeDefaultState from './defaultState';
// import { BillingAddressDetails, BillingAddressPayload, PaymentMethodPayload } from './types';

// const stripeSlice = createSlice({
//   name: 'stripe',
//   initialState: stripeDefaultState,
//   reducers: {
//     // get payment method
//     getPaymentMethodRequest(state) {
//       state.isLoadingPaymentMethods = true;
//       state.error = null;
//     },
//     getPaymentMethodResponse(state, action: PayloadAction<PaymentMethodPayload>) {
//       state.isLoadingPaymentMethods = false;
//       state.defaultMethod = action.payload.defaultMethod;
//       state.otherMethod = action.payload.otherMethod;
//       state.error = action.payload.error ? action.payload.error : null;
//     },

//     // add payment method
//     addPaymentMethodRequest(state) {
//       state.isLoadingAddPaymentMethods = true;
//       state.error = null;
//     },
//     addPaymentMethodResponse(state, action: PayloadAction<{ error?: any | StripeError<ConfirmSetupIntentError> }>) {
//       state.isLoadingAddPaymentMethods = false;
//       state.error = action.payload.error ? action.payload.error : null;
//     },

//     // get billing address
//     getBillingAddressRequest(state) {
//       state.isLoadingBillingAddress = true;
//       state.error = null;
//     },
//     getBillingAddressResponse(state, action: PayloadAction<BillingAddressPayload>) {
//       state.isLoadingBillingAddress = false;
//       state.billingAddress = action.payload.data;
//       state.error = action.payload.error ? action.payload.error : null;
//     },

//     // update billing address
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     updateBillingAddressRequest(state, action: PayloadAction<BillingAddressDetails>) {
//       state.isLoadingBillingAddressUpdate = true;
//       state.error = null;
//     },
//     updateBillingAddressResponse(state, action: PayloadAction<BillingAddressPayload>) {
//       state.isLoadingBillingAddressUpdate = false;
//       state.error = action.payload.error ? action.payload.error : null;
//     },
//   },
// });

// export const stripeActions = stripeSlice.actions;
// export const stripeReducers = stripeSlice.reducer;
