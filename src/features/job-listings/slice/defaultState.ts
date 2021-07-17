import { IJobListingInitialState } from './types';

export const jobListingInitialState: IJobListingInitialState = {
  isLoadingActiveJobs: false,
  errorActiveJobs: null,
  activeJobs: [],

  isLoadingOngoingJobs: false,
  errorOngoingJobs: null,
  onGoingJobs: [],

  isLoadingCompletedJobs: false,
  errorCompletedJobs: null,
  completedJobs: [],

  isLoadingCancelledJobs: false,
  errorCancelledJobs: null,
  cancelledJobs: [],
};
