import { IPaymentMethodResponse } from './apis';
import { BillingAddressApiDetails, BillingAddressDetails, BillingAddressResponse, MethodDetails } from './slice/types';

export const stripeTransformer = {
  toState(data: IPaymentMethodResponse) {
    const method = data.data;

    let defaultMethod: MethodDetails = {
      id: '',
      brand: '',
      last4: '',
      type: '',
    };

    let otherMethod: MethodDetails[] = [];

    if (method.payment_methods) {
      otherMethod = method.payment_methods.map((m) => ({
        id: m.id || '',
        brand: m.card.brand || '',
        last4: m.card.last4 || '',
        type: m.type || '',
      }));

      const defaultMethodId = method.default_payment_method.id;
      const found = otherMethod.find((m) => m.id === defaultMethodId);

      defaultMethod = {
        id: found?.id || '',
        brand: found?.brand || '',
        last4: found?.last4 || '',
        type: found?.type || '',
      };
    }

    return {
      defaultMethod,
      otherMethod,
    };
  },
};

export const billingAddressTransformer = {
  toApi(data: BillingAddressDetails): BillingAddressApiDetails {
    return {
      name: data.name,
      email: data.email,
      address: data.address,
      unit_no: data.unitNo,
      block_no: data.blockNo,
      postal_code: data.postalCode,
      country: data.country,
    };
  },

  toState(res: BillingAddressResponse): BillingAddressDetails {
    return {
      name: res.data.name || '',
      email: res.data.email || '',
      address: res.data.address || '',
      unitNo: res.data.unit_no || '',
      blockNo: res.data.block_no || '',
      postalCode: res.data.postal_code || '',
      country: res.data.country || '',
    };
  },
};
