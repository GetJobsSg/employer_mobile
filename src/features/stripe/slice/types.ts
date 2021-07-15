export interface MethodDetails {
  id: string;
  brand: string;
  last4: string;
  type: string;
}

export interface PaymentMethodPayload {
  defaultMethod: MethodDetails;
  otherMethod: MethodDetails[];
  error?: null | any;
}

export interface IStripeInitialState {
  isLoadingPaymentMethods: boolean;
  isLoadingAddPaymentMethods: boolean;
  error: null | any;
  defaultMethod: MethodDetails;
  otherMethod: MethodDetails[];
}
