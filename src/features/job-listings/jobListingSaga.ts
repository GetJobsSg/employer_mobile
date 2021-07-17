import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { JobStatus } from 'src/constants/status';
import { PayloadAction } from '@reduxjs/toolkit';
import { jobListingActions } from './slice';
import { getJobList } from './apis';
import { IJobListResponse } from './apis/types';
import { activeJobTransformer } from './transformer';
import { IActiveJobs } from './slice/types';

function* getActiveJobListSaga(action: PayloadAction<JobStatus.OPEN>) {
  const jobStatus = action.payload;
  try {
    const res: IJobListResponse = yield call(getJobList, jobStatus);
    const transformed: IActiveJobs = activeJobTransformer.toState(res.data);
    yield put(
      jobListingActions.getActiveJobListResponse({
        list: transformed,
        error: null,
      }),
    );
  } catch (e) {
    yield put(
      jobListingActions.getActiveJobListResponse({
        list: [],
        error: e,
      }),
    );
  }
}

// function* getOngoingJobListSaga() {}

// function* getCompletedJobListSaga() {}

function* watchJobListingSaga() {
  yield takeLatest(jobListingActions.getActiveJobListRequest, getActiveJobListSaga);
  //   yield takeLatest(jobListingActions.getOngoingJobListRequest, getOngoingJobListSaga);
  //   yield takeLatest(jobListingActions.getCompletedJobListRequest, getCompletedJobListSaga);
}

const jobListingSaga = [fork(watchJobListingSaga)];

export default jobListingSaga;
