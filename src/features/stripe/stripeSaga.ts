import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { stripeActions } from './slice';
import { getPaymentMethodsApi, IPaymentMethodResponse } from './apis';
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

function* watchStripeSaga() {
  yield takeLatest(stripeActions.getPaymentMethodRequest, getPaymentMethods);
}

const stripeSaga = [fork(watchStripeSaga)];

export default stripeSaga;
