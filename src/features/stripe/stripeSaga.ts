import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { confirmSetupIntent, ConfirmSetupIntentResult } from '@stripe/stripe-react-native';
import { stripeActions } from './slice';
import {
  getPaymentMethodsApi,
  getSetupIntentClientSecret,
  IPaymentMethodResponse,
  updateDefaultPaymentMethod,
} from './apis';
import { stripeTransformer } from './transformer';

function* getPaymentMethods() {
  try {
    const res: IPaymentMethodResponse = yield call(getPaymentMethodsApi);
    const transformed = stripeTransformer.toState(res);
    yield put(stripeActions.getPaymentMethodResponse(transformed));
  } catch (e) {
    yield put(stripeActions.getPaymentMethodResponse(e));
  }
}

function* addPaymentMethod() {
  try {
    const { data: clientSecret } = yield call(getSetupIntentClientSecret);
    const res: ConfirmSetupIntentResult = yield call(confirmSetupIntent, clientSecret, { type: 'Card' });

    if (res.error) {
      yield put(stripeActions.addPaymentMethodResponse({ error: res.error }));
      return;
    }

    const { paymentMethodId } = res.setupIntent;
    if (!paymentMethodId) {
      yield put(stripeActions.addPaymentMethodResponse({ error: 'No PaymentMethodId is created' }));
      return;
    }

    yield call(updateDefaultPaymentMethod, paymentMethodId);
    yield put(stripeActions.addPaymentMethodResponse({}));
    yield put(stripeActions.getPaymentMethodRequest());
  } catch (e) {
    yield put(stripeActions.addPaymentMethodResponse(e));
  }
}

function* watchStripeSaga() {
  yield takeLatest(stripeActions.getPaymentMethodRequest, getPaymentMethods);
  yield takeLatest(stripeActions.addPaymentMethodRequest, addPaymentMethod);
}

const stripeSaga = [fork(watchStripeSaga)];

export default stripeSaga;
