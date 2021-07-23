export interface ParticpantResponse {
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
    training_completed: boolean;
    date_updated: string;
    date_created: string;
    gender: string;
    education_level: any; // TODO CHECK TYPE
    verification_status: any; // TODO CHECK TYPE
  };
  job_application_status: {
    id: number;
    name: string;
    date_updated: string;
    date_created: string;
  };
}

export interface IParticipantListResponse {
  data: ParticpantResponse[];
}
