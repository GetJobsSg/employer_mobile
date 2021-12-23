import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { JobStatus } from 'src/constants/status';
import { CommonTypes } from 'src/shared';
import { jobDetailsActions } from './slice';
import { createJobTransformer, jobDetailsTransformer, updateJobTransformer } from './transformer';
import { createJob, getAllCategories, getAllDressCode, getJobDetails, updateJob } from './apis';
import { IGetAllCategoriesResponse, IJobDetailsPayload } from './slice/types';
import { jobListingActions } from '../job-listings/slice';
import { IDressCodeResponse, IJobDetailsResponse } from './apis/types';

function* createJobSaga(action: PayloadAction<any>) {
  const jobData = action.payload;
  const transformedJobData = createJobTransformer.toApi(jobData);

  try {
    yield call(createJob, transformedJobData);
    yield put(jobDetailsActions.createJobResponse({ error: null }));
    yield put(jobListingActions.getActiveJobListRequest(JobStatus.OPEN));
  } catch (e) {
    yield put(jobDetailsActions.createJobResponse({ error: e }));
  }
}

function* updateJobSaga(action: PayloadAction<{ data: any; jobId: number }>) {
  const dataToUpdate = action.payload.data;
  const { jobId } = action.payload;

  try {
    yield call(updateJob, jobId, updateJobTransformer.toApi(dataToUpdate));
    yield put(jobDetailsActions.updateJobDetailsResponse({ error: null }));
    yield put(jobListingActions.getActiveJobListRequest(JobStatus.OPEN));
  } catch (e) {
    yield put(jobDetailsActions.updateJobDetailsResponse({ error: e }));
  }
}

function* getJobDetailSaga(action: PayloadAction<CommonTypes.ICommonJobRequest>) {
  try {
    const { jobId } = action.payload;
    const res: IJobDetailsResponse = yield call(getJobDetails, jobId);
    const transformed: IJobDetailsPayload = jobDetailsTransformer.toState(res);
    yield put(jobDetailsActions.getJobDetailsResponse({ data: transformed, error: null }));
  } catch (e) {
    yield put(jobDetailsActions.getJobDetailsResponse({ data: {}, error: e }));
  }
}

function* getAllCategoriesSaga() {
  try {
    const res: IGetAllCategoriesResponse = yield call(getAllCategories);
    const list = res.data.map((d) => ({ id: d.id, name: d.name }));
    yield put(jobDetailsActions.getAllCategoriesResponse({ list, error: null }));
  } catch (e) {
    yield put(jobDetailsActions.getAllCategoriesResponse({ list: [], error: e }));
  }
}

function* getAllDresscodeSaga() {
  try {
    const res: IDressCodeResponse = yield call(getAllDressCode);
    const list = res.data.map((dress) => ({ id: dress.id, name: dress.name }));
    yield put(jobDetailsActions.getAllDresscodeResponse({ data: list, error: null }));
  } catch (e) {
    yield put(jobDetailsActions.getAllDresscodeResponse({ data: [], error: e }));
  }
}

function* watchJobDetailSaga() {
  yield takeLatest(jobDetailsActions.createJobRequest, createJobSaga);
  yield takeLatest(jobDetailsActions.updateJobDetailsRequest, updateJobSaga);
  yield takeLatest(jobDetailsActions.getJobDetailsRequest, getJobDetailSaga);
  yield takeLatest(jobDetailsActions.getAllCategoriesRequest, getAllCategoriesSaga);
  yield takeLatest(jobDetailsActions.getAllDresscodeRequest, getAllDresscodeSaga);
}

const jobDetailSaga = [fork(watchJobDetailSaga)];

export default jobDetailSaga;
