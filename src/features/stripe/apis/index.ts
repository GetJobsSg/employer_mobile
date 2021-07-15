import { get, put } from 'src/utils/network';
import { ISetupIntentSecretResponse, IPaymentMethodResponse } from './types';

export * from './types';

export const getSetupIntentClientSecret = (): Promise<ISetupIntentSecretResponse> =>
  get('/web/billing/payment/secret').then((res) => res.data);

export const getPaymentMethodsApi = (): Promise<IPaymentMethodResponse> =>
  get(`/web/billing/payment`).then((res) => res.data);

export const updateDefaultPaymentMethod = (paymentId: string): Promise<{}> =>
  put(`/web/billing/payment/default`, { payment_method_id: paymentId }).then((res) => res.data);
