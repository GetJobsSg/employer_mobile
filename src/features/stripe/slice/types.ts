import { IApiResponse, ICommonPayload } from 'src/shared/types';

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

export type BillingAddressResponse = IApiResponse<BillingAddressApiDetails>;

export interface BillingAddressApiDetails {
  name: string;
  email: string;
  address: string;
  unit_no: string;
  block_no: string;
  postal_code: string;
  country: string;
}

export interface BillingAddressDetails {
  name: string;
  email: string;
  address: string;
  unitNo: string;
  blockNo: string;
  postalCode: string;
  country: string;
}

export type BillingAddressPayload = ICommonPayload<BillingAddressDetails | null>;

export interface IStripeInitialState {
  isLoadingPaymentMethods: boolean;
  isLoadingBillingAddress: boolean;
  isLoadingBillingAddressUpdate: boolean;
  isLoadingAddPaymentMethods: boolean;
  error: null | any;
  defaultMethod: MethodDetails;
  otherMethod: MethodDetails[];
  billingAddress: BillingAddressDetails | null;
}
