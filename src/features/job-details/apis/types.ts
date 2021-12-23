import { IApiResponse } from 'src/shared/types';

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
  id: number;
  reference_code: string;
  title: string;
  desc: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  hourly_bill_rate: number;
  vacancy: number;
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
  dress_code: {
    id: number;
    name: string;
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

export interface IJobDetailsResponse {
  data: {
    job: IJobResponse;
    job_participants: any[]; // todo: add types
    job_locations: IJobLocation[];
  };
}

export interface IDressCode {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}

export type IDressCodeResponse = IApiResponse<IDressCode[]>;
