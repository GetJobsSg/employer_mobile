/**
 * REDUX INITIAL STATE
 */
export interface IJobDetailInitialState {
  // create
  isLoadingCreateJob: boolean;
  errorCreateJob: null | any;

  // update
  isLoadingUpdateJob: boolean;
  errorUpdateJob: null | any;

  // get job details
  isLoadingGetJobDetails: boolean;
  info: IJobDetailsPayload | {};
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
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  hourly_bill_rate: number;
  vacancy: number;
  job_location: ICreateJobRequestPayloadLocation[];
}

export type IUpdateJobRequestPayload = Omit<
  ICreateJobRequestPayload,
  'start_date' | 'end_date' | 'start_time' | 'end_time' | 'hourly_rate' | 'hourly_bill_rate'
>;

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
  dressCode: number;
  vacancy: number;
  category: number;
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
