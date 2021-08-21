export interface IWorker {
  id: number;
  jobseekerId: number;
  name: string;
  gender: string;
  age: number;
  ratings: string;
  profileImage: string;
  mobile: string;
  clockInTime: string;
  clockOutTime: string;
}

export interface IWorkerListingInitialState {
  isLoadingAllWorkers: boolean;
  allWorkers: IWorker[];
  errorAllWorkers: null | any;
}

export interface IWorkerListPayload {
  list: IWorker[];
  error: null | any;
}
