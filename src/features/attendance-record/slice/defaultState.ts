import { IAttendanceRecordInitialState } from './types';

export const attendanceRecordInitialState: IAttendanceRecordInitialState = {
  // get all attendance records
  isLoadingAttendanceRecords: false,
  errorAttendanceRecords: null,
  attendanceRecords: [],

  // get billing Info
  isLoadingGetBillingInfo: false,
  errorBillingInfo: null,
  billingInfo: null,

  // update attendee working data
  isLoadingUpdateWorkingData: false,
  errorUpdateWorkingData: null,

  // conclude job
  isConcludingJob: false,
  errorConcludeJob: null,
};
