import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { CommonTypes } from 'src/shared';
import { workerListingActions } from './slice';
import { getAllWorkers } from './apis';
import { IWorkerListResponse } from './apis/types';
import { workerTransformer } from './transformer';
import { IWorker } from './slice/types';

function* getAllWorkerSaga(action: PayloadAction<CommonTypes.ICommonJobRequest>) {
  try {
    const { jobId } = action.payload;
    const res: IWorkerListResponse = yield call(getAllWorkers, jobId);
    const transformed: IWorker[] = workerTransformer.toState(res);
    yield put(workerListingActions.getAllWorkerResponse({ list: transformed, error: null }));
  } catch (e) {
    yield put(workerListingActions.getAllWorkerResponse({ list: [], error: e }));
  }
}

function* watchWorkerListingSaga() {
  yield takeLatest(workerListingActions.getAllWorkerRequest, getAllWorkerSaga);
}

const workerListingSaga = [fork(watchWorkerListingSaga)];

export default workerListingSaga;
