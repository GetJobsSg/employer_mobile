export interface IAttendanceParticipantRes {
  id: number;
  normal_hours_worked: number;
  ot_hours_worked: number;
  rating: number;
  comments: string;
  date_updated: string;
  date_created: string;
  employee: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    mobile: string;
    dob: string;
    profile_img: string;
    education_level_id: number;
    vaccinated: boolean;
    training_completed: boolean;
    date_updated: string;
    date_created: string;
    gender: null | any; // to define types
    verification_status: null | any; // to define types
  };
  job_application_status: {
    id: number;
    name: string;
    date_updated: string;
    date_created: string;
  };
}

export interface IAttendanceRes {
  id: number;
  job_participant_id: number;
  clock_in_time: string | null;
  clock_out_time: string | null;
  date_updated: string;
  date_created: string;
  job_participant: IAttendanceParticipantRes;
}

export interface IAttendanceAllRes {
  data: [IAttendanceRes[]];
}
