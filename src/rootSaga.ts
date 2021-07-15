import { all } from 'redux-saga/effects';
import watchAuthSaga from 'src/features/auth/authSaga';
import stripeSaga from './features/stripe/stripeSaga';

export default function* rootSaga() {
  yield all([...watchAuthSaga]);
  yield all([...stripeSaga]);
}
