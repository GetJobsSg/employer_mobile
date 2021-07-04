import { all } from 'redux-saga/effects';
import watchAuthSaga from 'src/features/auth/authSaga';

export default function* rootSaga() {
  yield all([...watchAuthSaga]);
}
