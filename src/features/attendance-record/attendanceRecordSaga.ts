import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { CommonTypes } from 'src/shared';
import { attendanceRecordActions } from './slice';
import { adjustWorkingData, getAttendanceRecord } from './apis';
import { IAttendanceAllRes } from './apis/types';
import { attendanceRecordTransformer } from './transformer';
import { IAttendanceRecord, IWorkingDataRequestPayload } from './slice/types';

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

function* adjustWorkingDataSaga(action: PayloadAction<CommonTypes.ICommonJobRequest & IWorkingDataRequestPayload>) {
  try {
    const { jobId, ...data } = action.payload;
    yield call(adjustWorkingData, jobId, data);

    // do not put(attendanceRecordActions.getAttendanceRecordRequest)
    const res: IAttendanceAllRes = yield call(getAttendanceRecord, jobId);
    const transformed: IAttendanceRecord[] = attendanceRecordTransformer.toState(res);
    yield put(attendanceRecordActions.getAttendanceRecordResponse({ list: transformed, error: null }));

    yield put(attendanceRecordActions.adjustWorkingDataResponse({ error: null }));
  } catch (e) {
    yield put(attendanceRecordActions.adjustWorkingDataResponse({ error: e }));
  }
}

function* watchAttendanceRecordSaga() {
  yield takeLatest(attendanceRecordActions.getAttendanceRecordRequest, getAttendanceRecordSaga);
  yield takeLatest(attendanceRecordActions.adjustWorkingDataRequest, adjustWorkingDataSaga);
}

const attendanceRecordSaga = [fork(watchAttendanceRecordSaga)];

export default attendanceRecordSaga;
