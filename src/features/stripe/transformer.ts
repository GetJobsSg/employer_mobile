import { IPaymentMethodResponse } from './apis';
import { MethodDetails } from './slice/types';

export const stripeTransformer = {
  toState(data: IPaymentMethodResponse) {
    const method = data.data;

    const otherMethod: MethodDetails[] = method.payment_methods.map((m) => ({
      id: m.id || '',
      brand: m.card.brand || '',
      last4: m.card.last4 || '',
      type: m.type || '',
    }));

    const defaultMethodId = method.default_payment_method.id;
    const found = otherMethod.find((m) => m.id === defaultMethodId);

    const defaultMethod: MethodDetails = {
      id: found?.id || '',
      brand: found?.brand || '',
      last4: found?.last4 || '',
      type: found?.type || '',
    };

    return {
      defaultMethod,
      otherMethod,
    };
  },
};
