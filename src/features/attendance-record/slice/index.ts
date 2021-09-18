import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonTypes } from 'src/shared';
import { attendanceRecordInitialState } from './defaultState';
import { IAttendanceRecordPayload } from './types';

const attendanceRecordSlice = createSlice({
  name: 'attendanceRecord',
  initialState: attendanceRecordInitialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAttendanceRecordRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingAttendanceRecords = true;
    },
    getAttendanceRecordResponse(state, action: PayloadAction<IAttendanceRecordPayload>) {
      state.isLoadingAttendanceRecords = false;
      state.attendanceRecords = action.payload.error ? state.attendanceRecords : action.payload.list;
      state.errorAttendanceRecords = action.payload.error ? action.payload.error : null;
    },
  },
});

export const attendanceRecordActions = attendanceRecordSlice.actions;
export const attendanceRecordReducers = attendanceRecordSlice.reducer;
