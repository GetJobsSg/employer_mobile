export interface IJobCommon {
  id: number | undefined;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  company: {
    id: number | undefined;
    name: string;
  };
  jobCategoryId: {
    id: number | undefined;
    name: string;
  };
}

export type IActiveJobs = IJobCommon[];
export type IOngoingJobs = IJobCommon[];
export type ICompletedJobs = IJobCommon[];
export type ICancelledJobs = IJobCommon[];

export interface IJobListingInitialState {
  isLoadingActiveJobs: boolean;
  errorActiveJobs: null | any;
  activeJobs: IActiveJobs;

  isLoadingOngoingJobs: boolean;
  errorOngoingJobs: null | any;
  onGoingJobs: IActiveJobs;

  isLoadingCompletedJobs: boolean;
  errorCompletedJobs: null | any;
  completedJobs: IActiveJobs;

  isLoadingCancelledJobs: boolean;
  errorCancelledJobs: null | any;
  cancelledJobs: IActiveJobs;
}

export interface IActiveJobListPayload {
  list: IActiveJobs;
  error: null | any;
}

export interface IOngoingJobListPayload {
  list: IOngoingJobs;
  error: null | any;
}

export interface ICompletedJobListPayload {
  list: ICompletedJobs;
  error: null | any;
}

export interface ICancelledJobListPayload {
  list: ICancelledJobs;
  error: null | any;
}
