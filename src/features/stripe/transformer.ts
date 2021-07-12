import { IPaymentMethodResponse } from './apis';
import { MethodDetails } from './slice/types';

export const stripeTransformer = {
  toState(data: IPaymentMethodResponse) {
    const method = data.data;
    const defaultMethod: MethodDetails = {
      id: method.default_payment_method.id || '',
      brand: method.default_payment_method.card?.brand || '',
      last4: method.default_payment_method.card?.last4 || '',
      type: method.default_payment_method.type || '',
    };

    // excluded the default method
    const restMethod = method.payment_methods.filter((f) => f.id !== defaultMethod.id);
    const otherMethod: MethodDetails[] = restMethod.map((m) => ({
      id: m.id || '',
      brand: m.card.brand || '',
      last4: m.card.last4 || '',
      type: m.type || '',
    }));

    return {
      defaultMethod,
      otherMethod,
    };
  },
};
