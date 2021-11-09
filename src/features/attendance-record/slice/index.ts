import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonTypes } from 'src/shared';
import { attendanceRecordInitialState } from './defaultState';
import {
  IAttendanceRecordPayload,
  IBillingInfoPayload,
  IConcludeJobResponsePayload,
  IWorkingDataRequestPayload,
  IWorkingDataResponsePayload,
} from './types';

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getBillingInfoRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingGetBillingInfo = true;
    },
    getBillingInfoResponse(state, action: PayloadAction<IBillingInfoPayload>) {
      state.isLoadingGetBillingInfo = false;
      state.billingInfo = action.payload.data;
      state.errorBillingInfo = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    adjustWorkingDataRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest & IWorkingDataRequestPayload>) {
      state.isLoadingUpdateWorkingData = true;
    },
    adjustWorkingDataResponse(state, action: PayloadAction<IWorkingDataResponsePayload>) {
      state.isLoadingUpdateWorkingData = false;
      state.errorUpdateWorkingData = action.payload.error ? action.payload.error : null;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    concludeJobRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isConcludingJob = true;
    },
    concludeJobResponse(state, action: PayloadAction<IConcludeJobResponsePayload>) {
      state.isConcludingJob = false;
      state.errorConcludeJob = action.payload.error ? action.payload.error : null;
    },
  },
});

export const attendanceRecordActions = attendanceRecordSlice.actions;
export const attendanceRecordReducers = attendanceRecordSlice.reducer;
