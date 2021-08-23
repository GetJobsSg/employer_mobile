export interface IWorkerResponse {
  id: number;
  job_participant_id: number;
  clock_in_time: null | string;
  clock_out_time: null | string;
  date_updated: string;
  date_created: string;
  job_participant: {
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
  };
}
export interface IWorkerListResponse {
  data: IWorkerResponse[];
}
