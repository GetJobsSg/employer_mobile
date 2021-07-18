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

export interface IJobActive extends IJobCommon {}

export interface IJobOngoing extends IJobCommon {}

export interface IJobCompleted extends IJobCommon {}

export interface IJobCancelled extends IJobCommon {}

export interface IJobListingInitialState {
  isLoadingActiveJobs: boolean;
  errorActiveJobs: null | any;
  activeJobs: IJobActive[];

  isLoadingOngoingJobs: boolean;
  errorOngoingJobs: null | any;
  onGoingJobs: IJobOngoing[];

  isLoadingCompletedJobs: boolean;
  errorCompletedJobs: null | any;
  completedJobs: IJobCompleted[];

  isLoadingCancelledJobs: boolean;
  errorCancelledJobs: null | any;
  cancelledJobs: IJobCancelled[];
}

export interface IActiveJobListPayload {
  list: IJobActive[];
  error: null | any;
}

export interface IOngoingJobListPayload {
  list: IJobOngoing[];
  error: null | any;
}

export interface ICompletedJobListPayload {
  list: IJobCompleted[];
  error: null | any;
}

export interface ICancelledJobListPayload {
  list: IJobCancelled[];
  error: null | any;
}
