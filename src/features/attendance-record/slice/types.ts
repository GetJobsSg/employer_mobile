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

export interface IBillingInfo {
  id: number;
  jobId: number;
  companyId: number;
  amount: number;
  billAmount: number;
  billingModeId: number;
  paid: boolean;
}

export interface IAttendanceRecordInitialState {
  // get attendance records
  isLoadingAttendanceRecords: boolean;
  attendanceRecords: IAttendanceRecord[];
  errorAttendanceRecords: null | any;
  // get billing Info
  isLoadingGetBillingInfo: boolean;
  billingInfo: IBillingInfo | null;
  errorBillingInfo: null | any;
  // update working data
  isLoadingUpdateWorkingData: boolean;
  errorUpdateWorkingData: null | any;
  // conclude job
  isConcludingJob: boolean;
  errorConcludeJob: null | any;
}

export interface IAttendanceRecordPayload {
  list: IAttendanceRecord[];
  error: null | any;
}

export interface IBillingInfoPayload {
  data: IBillingInfo | null;
  error: null | any;
}

export interface IWorkingDataRequestPayload {
  employee_id: number;
  normal_hours_worked: number;
  rating: number;
  comments: string;
  ot_hours_worked: number;
}

export interface ICommonErrorPayload {
  error: null | any;
}
export interface IWorkingDataResponsePayload extends ICommonErrorPayload {}

export interface IConcludeJobResponsePayload extends ICommonErrorPayload {}
