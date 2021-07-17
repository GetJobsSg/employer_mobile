export interface IJob {
  id: number;
  reference_code: string;
  title: string;
  desc: string;
  requirements: string;
  responsibilities: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  hourly_bill_rate: number;
  start_code: string;
  end_code: string;
  date_updated: string;
  date_created: string;
  company: {
    id: number;
    name: string;
    desc: string;
    primary_contact: string;
    logo_img: string;
    date_updated: string;
    date_created: string;
  };
  job_category: {
    id: number;
    name: string;
    date_updated: string;
    date_created: string;
  };
  job_status: {
    id: number;
    name: string;
    date_updated: string;
    date_created: string;
  };
}

export interface IJobParticipant {
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
    nric_no: string;
    profile_img: string;
    training_completed: false;
    date_updated: string;
    date_created: string;
    gender: null | string;
    education_level: any; // TO CHECK TYPE
    verification_status: any; // TO CHECK TYPE
  };
  job_application_status: {
    id: number;
    name: string;
    date_updated: string;
    date_created: string;
  };
}

export interface IJobLocation {
  id: number;
  address: string;
  postal_code: string;
  block_no: string;
  unit_no: string;
  date_updated: string;
  date_created: string;
}

export interface IJobResponse {
  job: IJob;
  job_participants: IJobParticipant[];
  job_locations: IJobLocation[];
}

export interface IJobListResponse {
  data: IJobResponse[];
}
