import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { CommonTypes } from 'src/shared';
import { attendanceRecordActions } from './slice';
import { getAttendanceRecord } from './apis';
import { IAttendanceAllRes } from './apis/types';
import { attendanceRecordTransformer } from './transformer';
import { IAttendanceRecord } from './slice/types';

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

function* watchAttendanceRecordSaga() {
  yield takeLatest(attendanceRecordActions.getAttendanceRecordRequest, getAttendanceRecordSaga);
}

const attendanceRecordSaga = [fork(watchAttendanceRecordSaga)];

export default attendanceRecordSaga;
