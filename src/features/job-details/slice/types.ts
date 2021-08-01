export interface ICreateJobRequestPayloadLocation {
  address: string;
  postal_code: string;
  block_no: string;
  unit_no: string;
}

export interface ICreateJobRequestPayload {
  title: string;
  desc: string;
  job_category_id: number;
  requirements: string;
  responsibilities: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  hourly_bill_rate: number;
  job_location: ICreateJobRequestPayloadLocation[]; // request backend to use object instead
}

export interface ICreateJobResponsePayload {
  error: null | any;
}
