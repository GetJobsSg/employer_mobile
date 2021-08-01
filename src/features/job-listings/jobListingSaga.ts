import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { JobStatus } from 'src/constants/status';
import { PayloadAction } from '@reduxjs/toolkit';
import { jobListingActions } from './slice';
import { getJobList } from './apis';
import { IJobListResponse } from './apis/types';
import { jobListingTransformer } from './transformer';
import { IJobActive, IJobCancelled, IJobCompleted, IJobOngoing } from './slice/types';

function* getActiveJobListSaga(action: PayloadAction<JobStatus.OPEN>) {
  const jobStatus = action.payload;
  try {
    const res: IJobListResponse = yield call(getJobList, jobStatus);
    const transformed: IJobActive[] = jobListingTransformer.toState(res.data);
    yield put(jobListingActions.getActiveJobListResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(jobListingActions.getActiveJobListResponse({ list: [], error: e }));
  }
}

function* getOngoingJobListSaga(action: PayloadAction<JobStatus.ONGOING>) {
  const jobStatus = action.payload;
  try {
    const res: IJobListResponse = yield call(getJobList, jobStatus);
    const transformed: IJobOngoing[] = jobListingTransformer.toState(res.data);
    yield put(jobListingActions.getOngoingJobListResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(jobListingActions.getOngoingJobListResponse({ list: [], error: e }));
  }
}

function* getCompletedJobListSaga(action: PayloadAction<JobStatus.COMPLETED>) {
  const jobStatus = action.payload;
  try {
    const res: IJobListResponse = yield call(getJobList, jobStatus);
    const transformed: IJobCompleted[] = jobListingTransformer.toState(res.data);
    yield put(jobListingActions.getCompletedJobListResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(jobListingActions.getCompletedJobListResponse({ list: [], error: e }));
  }
}

function* getCancelledJobListSaga(action: PayloadAction<JobStatus.CANCELLED>) {
  const jobStatus = action.payload;
  try {
    const res: IJobListResponse = yield call(getJobList, jobStatus);
    const transformed: IJobCancelled[] = jobListingTransformer.toState(res.data);
    yield put(jobListingActions.getCancelledJobListResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(jobListingActions.getCancelledJobListResponse({ list: [], error: e }));
  }
}

function* watchJobListingSaga() {
  yield takeLatest(jobListingActions.getActiveJobListRequest, getActiveJobListSaga);
  yield takeLatest(jobListingActions.getOngoingJobListRequest, getOngoingJobListSaga);
  yield takeLatest(jobListingActions.getCompletedJobListRequest, getCompletedJobListSaga);
  yield takeLatest(jobListingActions.getCancelledJobListRequest, getCancelledJobListSaga);
}

const jobListingSaga = [fork(watchJobListingSaga)];

export default jobListingSaga;
