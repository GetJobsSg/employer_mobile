import { IStripeInitialState } from './types';

const stripeDefaultState: IStripeInitialState = {
  isLoadingPaymentMethods: false,
  isLoadingBillingAddress: false,
  isLoadingAddPaymentMethods: false,
  isLoadingBillingAddressUpdate: false,
  error: null,
  otherMethod: [],
  defaultMethod: {
    id: '',
    brand: '',
    last4: '',
    type: '',
  },
  billingAddress: {
    name: '',
    email: '',
    address: '',
    unitNo: '',
    blockNo: '',
    postalCode: '',
    country: '',
  },
};

export default stripeDefaultState;
