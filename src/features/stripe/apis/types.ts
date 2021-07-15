export interface ICard {
  brand: string;
  checks: {
    address_line1_check: string;
    address_postal_code_check: string;
    cvc_check: string;
  };
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  last4: string;
  three_d_secure_usage: {
    supported: boolean;
  };
  wallet: null | string;
  description: string;
  iin: string;
  issuer: string;
}

export interface IDefaultPaymentMethod {
  au_becs_debit: null | string;
  billing_details: null | string;
  card: null | ICard;
  card_present: null | string;
  created: number;
  customer: null | string;
  fpx: null | string;
  id: string;
  ideal: null | string;
  livemode: false;
  metadata: null | string;
  object: string;
  sepa_debit: null | string;
  type: string;
}

export interface IPaymentMethod {
  au_becs_debit: null | string;
  billing_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    email: string;
    name: string;
    phone: string;
  };
  card: ICard;
  card_present: null;
  created: number;
  customer: any;
  fpx: null | string;
  id: string;
  ideal: null | string;
  livemode: boolean;
  metadata: object;
  object: string;
  sepa_debit: null | string;
  type: string;
}

export interface IPaymentMethodResponse {
  data: {
    default_payment_method: IDefaultPaymentMethod;
    payment_methods: IPaymentMethod[];
  };
}

export interface ISetupIntentSecretResponse {
  data: string;
}

export interface IDefaultPaymentMethodPayload {
  payment_method_id: string;
}
