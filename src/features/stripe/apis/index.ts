import { get } from 'src/utils/network';
import { ISetupIntentSecretResponse, IPaymentMethodResponse } from './types';

export * from './types';

export const getSetupIntentClientSecret = (): Promise<ISetupIntentSecretResponse> =>
  get('/web/billing/payment/secret').then((res) => res.data);

export const getPaymentMethodsApi = (): Promise<IPaymentMethodResponse> =>
  get(`/web/billing/payment`).then((res) => res.data);
