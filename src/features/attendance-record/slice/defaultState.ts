import { IAttendanceRecordInitialState } from './types';

export const attendanceRecordInitialState: IAttendanceRecordInitialState = {
  // get all attendance records
  isLoadingAttendanceRecords: false,
  errorAttendanceRecords: null,
  attendanceRecords: [],

  // update attendee working data
  isLoadingUpdateWorkingData: false,
  errorUpdateWorkingData: null,
};
