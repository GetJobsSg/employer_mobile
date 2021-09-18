export interface IAttendanceRecord {
  id: number;
  jobseekerId: number;
  name: string;
  gender: string;
  age: number;
  ratings: number;
  profileImage: string;
  mobile: string;
  clockInTime: string | null;
  clockOutTime: string | null;
  normalHoursWorked: number;
  otHoursWorked: number;
}

export interface IAttendanceRecordInitialState {
  isLoadingAttendanceRecords: boolean;
  attendanceRecords: IAttendanceRecord[];
  errorAttendanceRecords: null | any;
}

export interface IAttendanceRecordPayload {
  list: IAttendanceRecord[];
  error: null | any;
}
