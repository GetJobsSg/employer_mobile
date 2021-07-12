import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import stripeDefaultState from './defaultState';
import { PaymentMethodPayload } from './types';

const stripeSlice = createSlice({
  name: 'stripe',
  initialState: stripeDefaultState,
  reducers: {
    getPaymentMethodRequest(state) {
      state.isLoadingPaymentMethods = true;
    },
    getPaymentMethodResponse(state, action: PayloadAction<PaymentMethodPayload>) {
      state.isLoadingPaymentMethods = false;
      state.defaultMethod = action.payload.defaultMethod;
      state.otherMethod = action.payload.otherMethod;
      state.error = action.payload.error ? action.payload.error : null;
    },
  },
});

export const stripeActions = stripeSlice.actions;
export const stripeReducers = stripeSlice.reducer;
