import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { jobDetailsActions } from './slice';
import { createJobTransformer } from './transformer';
import { createJob, getAllCategories } from './apis';
import { IGetAllCategoriesResponse } from './slice/types';

function* createJobSaga(action: PayloadAction<any>) {
  const jobData = action.payload;
  const transformedJobData = createJobTransformer.toApi(jobData);

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

function* getAllCategoriesSaga() {
  try {
    const res: IGetAllCategoriesResponse = yield call(getAllCategories);
    const list = res.data.map((d) => ({ id: d.id, name: d.name }));
    yield put(jobDetailsActions.getAllCategoriesResponse({ list, error: null }));
  } catch (e) {
    yield put(jobDetailsActions.getAllCategoriesResponse({ list: [], error: e }));
  }
}

function* watchJobDetailSaga() {
  yield takeLatest(jobDetailsActions.createJobRequest, createJobSaga);
  yield takeLatest(jobDetailsActions.getJobRequest, getJobDetailSaga);
  yield takeLatest(jobDetailsActions.getAllCategoriesRequest, getAllCategoriesSaga);
}

const jobDetailSaga = [fork(watchJobDetailSaga)];

export default jobDetailSaga;
