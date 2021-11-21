/**
 * REDUX INITIAL STATE
 */
export interface IJobDetailInitialState {
  // create
  isLoadingCreateJob: boolean;
  errorCreateJob: null | any;

  // get job details
  isLoadingGetJobDetails: boolean;
  jobDetails: IJobDetailsPayload | {};
  errorJobDetails: null;

  // getAll categories
  isLoadingGetAllCategories: boolean;
  allCategories: Pick<ICategory, 'id' | 'name'>[];
  allCategoriesErr: null | any;

  // getAll dresscode
  isLoadingGetAllDresscode: boolean;
  allDresscode: IDressCodePayload[];
  allDresscodeErr: null | any;
}

/**
 * CREATE JOB
 */
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
  dress_code_id: number;
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

/**
 * GET ALL CATEGORIES
 */
export interface ICategory {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}
export interface IGetAllCategoriesResponse {
  data: ICategory[];
}

export interface IJobDetailsPayload {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  jobTitle: string;
  jobDescription: string;
  hourlyRate: number;
  category: number;
  requirements: string;
  responsiblities: string;
  address: string;
  postalCode: string;
  blockNo: string;
  unitNo: string;
}

export interface IJobDetailsResponsePayload {
  data: IJobDetailsPayload | {};
  error: null | any;
}

export interface IDressCodePayload {
  id: number;
  name: string;
}
