export interface IAttendanceRecord {
  id: number;
  jobseekerId: number;
  name: string;
  gender: string;
  age: number;
  comment: string;
  ratings: number;
  profileImage: string;
  mobile: string;
  clockInTime: string | null;
  clockOutTime: string | null;
  normalHoursWorked: number;
  otHoursWorked: number;
}

export interface IAttendanceRecordInitialState {
  // get attendance records
  isLoadingAttendanceRecords: boolean;
  attendanceRecords: IAttendanceRecord[];
  errorAttendanceRecords: null | any;
  // update working data
  isLoadingUpdateWorkingData: boolean;
  errorUpdateWorkingData: null | any;
}

export interface IAttendanceRecordPayload {
  list: IAttendanceRecord[];
  error: null | any;
}

export interface IWorkingDataRequestPayload {
  employee_id: number;
  normal_hours_worked: number;
  rating: number;
  comments: string;
  ot_hours_worked: number;
}

export interface IWorkingDataResponsePayload {
  error: null | any;
}
