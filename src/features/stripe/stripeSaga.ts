import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { confirmSetupIntent, ConfirmSetupIntentResult } from '@stripe/stripe-react-native';
import { PayloadAction } from '@reduxjs/toolkit';
import { stripeActions } from './slice';
import {
  getBillingAddress,
  getPaymentMethodsApi,
  getSetupIntentClientSecret,
  IPaymentMethodResponse,
  updateBillingAddress,
  updateDefaultPaymentMethod,
} from './apis';
import { billingAddressTransformer, stripeTransformer } from './transformer';
import { BillingAddressDetails, BillingAddressResponse } from './slice/types';

function* getPaymentMethodsSaga() {
  try {
    const res: IPaymentMethodResponse = yield call(getPaymentMethodsApi);
    const transformed = stripeTransformer.toState(res);
    yield put(stripeActions.getPaymentMethodResponse(transformed));
  } catch (e) {
    yield put(stripeActions.getPaymentMethodResponse(e));
  }
}

function* addPaymentMethodSaga() {
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
    yield put(stripeActions.addPaymentMethodResponse({ error: e }));
  }
}

function* getBillingAddressSaga() {
  try {
    const res: BillingAddressResponse = yield call(getBillingAddress);
    const transformed: BillingAddressDetails = billingAddressTransformer.toState(res);
    yield put(stripeActions.getBillingAddressResponse({ data: transformed, error: null }));
  } catch (e) {
    yield put(stripeActions.getBillingAddressResponse({ data: null, error: e }));
  }
}

function* updateBillingAddressSaga(action: PayloadAction<BillingAddressDetails>) {
  try {
    const data = action.payload;
    yield call(updateBillingAddress, billingAddressTransformer.toApi(action.payload));
    yield put(stripeActions.updateBillingAddressResponse({ data, error: null }));
  } catch (e) {
    yield put(stripeActions.updateBillingAddressResponse({ data: null, error: e }));
  }
}

function* watchStripeSaga() {
  yield takeLatest(stripeActions.getPaymentMethodRequest, getPaymentMethodsSaga);
  yield takeLatest(stripeActions.addPaymentMethodRequest, addPaymentMethodSaga);
  yield takeLatest(stripeActions.getBillingAddressRequest, getBillingAddressSaga);
  yield takeLatest(stripeActions.updateBillingAddressRequest, updateBillingAddressSaga);
}

const stripeSaga = [fork(watchStripeSaga)];

export default stripeSaga;
