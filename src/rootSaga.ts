import { all } from 'redux-saga/effects';
import authSaga from 'src/features/auth/authSaga';
import stripeSaga from './features/stripe/stripeSaga';
import jobListingSaga from './features/job-listings/jobListingSaga';

export default function* rootSaga() {
  yield all([...authSaga]);
  yield all([...stripeSaga]);
  yield all([...jobListingSaga]);
}
