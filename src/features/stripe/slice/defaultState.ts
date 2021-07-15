import { IStripeInitialState } from './types';

const stripeDefaultState: IStripeInitialState = {
  isLoadingPaymentMethods: false,
  isLoadingAddPaymentMethods: false,
  error: null,
  otherMethod: [],
  defaultMethod: {
    id: '',
    brand: '',
    last4: '',
    type: '',
  },
};

export default stripeDefaultState;
