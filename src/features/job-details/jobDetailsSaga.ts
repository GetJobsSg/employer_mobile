import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { jobDetailsActions } from './slice';
import { createJobTransformer } from './transformer';
import { createJob } from './apis';

function* createJobSaga(action: PayloadAction<any>) {
  const jobData = action.payload;
  const transformedJobData = createJobTransformer.toApi(jobData);

  console.log({
    transformedJobData,
  });

  try {
    yield call(createJob, transformedJobData);
    yield put(jobDetailsActions.createJobResponse({ error: null }));
  } catch (e) {
    yield put(jobDetailsActions.createJobResponse({ error: e }));
  }
}

function* getJobDetailSaga() {
  yield 'get job details';
}

function* watchJobDetailSaga() {
  yield takeLatest(jobDetailsActions.createJobRequest, createJobSaga);
  yield takeLatest(jobDetailsActions.createJobRequest, getJobDetailSaga);
}

const jobDetailSaga = [fork(watchJobDetailSaga)];

export default jobDetailSaga;
