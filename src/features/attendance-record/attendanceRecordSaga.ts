import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { CommonTypes } from 'src/shared';
import { JobStatus } from 'src/constants/status';
import { attendanceRecordActions } from './slice';
import { adjustWorkingData, concludeJob, getAttendanceRecord, getBillingInfo } from './apis';
import { IAttendanceAllRes, IBillingInfoRes } from './apis/types';
import { attendanceRecordTransformer, billingInfoTransformer } from './transformer';
import { IAttendanceRecord, IBillingInfo, IWorkingDataRequestPayload } from './slice/types';
import { jobListingActions } from '../job-listings/slice';

function* getAttendanceRecordSaga(action: PayloadAction<CommonTypes.ICommonJobRequest>) {
  try {
    const id = action.payload.jobId;
    const res: IAttendanceAllRes = yield call(getAttendanceRecord, id);
    const transformed: IAttendanceRecord[] = attendanceRecordTransformer.toState(res);
    yield put(attendanceRecordActions.getAttendanceRecordResponse({ list: transformed, error: null }));
  } catch (err) {
    yield put(attendanceRecordActions.getAttendanceRecordResponse({ list: [], error: err }));
  }
}

function* getBillingInfoSaga(action: PayloadAction<CommonTypes.ICommonJobRequest>) {
  try {
    const id = action.payload.jobId;
    const res: IBillingInfoRes = yield call(getBillingInfo, id);
    const transformed: IBillingInfo = billingInfoTransformer.toState(res);
    yield put(attendanceRecordActions.getBillingInfoResponse({ data: transformed, error: null }));
  } catch (e) {
    yield put(attendanceRecordActions.getBillingInfoResponse({ data: null, error: e }));
  }
}

function* adjustWorkingDataSaga(action: PayloadAction<CommonTypes.ICommonJobRequest & IWorkingDataRequestPayload>) {
  try {
    const { jobId, ...data } = action.payload;
    yield call(adjustWorkingData, jobId, data);

    const res: IAttendanceAllRes = yield call(getAttendanceRecord, jobId);
    const transformed: IAttendanceRecord[] = attendanceRecordTransformer.toState(res);
    yield put(attendanceRecordActions.getAttendanceRecordResponse({ list: transformed, error: null }));
    yield put(attendanceRecordActions.adjustWorkingDataResponse({ error: null }));
  } catch (e) {
    yield put(attendanceRecordActions.adjustWorkingDataResponse({ error: e }));
  }
}

function* concludeJobSaga(action: PayloadAction<CommonTypes.ICommonJobRequest>) {
  try {
    const { jobId } = action.payload;
    yield call(concludeJob, jobId);
    yield put(jobListingActions.getOngoingJobListRequest(JobStatus.ONGOING));
    yield put(jobListingActions.getCompletedJobListRequest(JobStatus.COMPLETED));
    yield put(attendanceRecordActions.concludeJobResponse({ error: null }));
  } catch (e) {
    yield put(attendanceRecordActions.concludeJobResponse({ error: e }));
  }
}

function* watchAttendanceRecordSaga() {
  yield takeLatest(attendanceRecordActions.getAttendanceRecordRequest, getAttendanceRecordSaga);
  yield takeLatest(attendanceRecordActions.getBillingInfoRequest, getBillingInfoSaga);
  yield takeLatest(attendanceRecordActions.adjustWorkingDataRequest, adjustWorkingDataSaga);
  yield takeLatest(attendanceRecordActions.concludeJobRequest, concludeJobSaga);
}

const attendanceRecordSaga = [fork(watchAttendanceRecordSaga)];

export default attendanceRecordSaga;
