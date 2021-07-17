import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobStatus } from 'src/constants/status';
import { jobListingInitialState } from './defaultState';
import {
  IActiveJobListPayload,
  ICancelledJobListPayload,
  ICompletedJobListPayload,
  IOngoingJobListPayload,
} from './types';

const jobListingSlice = createSlice({
  name: 'jobListing',
  initialState: jobListingInitialState,
  reducers: {
    // active jobs listing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getActiveJobListRequest(state, action: PayloadAction<JobStatus.OPEN>) {
      state.isLoadingActiveJobs = true;
    },
    getActiveJobListResponse(state, action: PayloadAction<IActiveJobListPayload>) {
      state.isLoadingActiveJobs = false;
      state.activeJobs = action.payload.error ? state.activeJobs : action.payload.list;
      state.errorActiveJobs = action.payload.error ? action.payload.error : null;
    },

    // ongoing jobs listing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getOngoingJobListRequest(state, action: PayloadAction<JobStatus.ONGOING>) {
      state.isLoadingOngoingJobs = true;
    },
    getOngoingJobListResponse(state, action: PayloadAction<IOngoingJobListPayload>) {
      state.isLoadingOngoingJobs = false;
      state.onGoingJobs = action.payload.error ? state.onGoingJobs : action.payload.list;
      state.errorOngoingJobs = action.payload.error ? action.payload.error : null;
    },

    // completed jobs listing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCompletedJobListRequest(state, action: PayloadAction<JobStatus.COMPLETED>) {
      state.isLoadingCompletedJobs = true;
    },
    getCompletedJobListResponse(state, action: PayloadAction<ICompletedJobListPayload>) {
      state.isLoadingCompletedJobs = false;
      state.completedJobs = action.payload.error ? state.completedJobs : action.payload.list;
      state.errorCompletedJobs = action.payload.error ? action.payload.error : null;
    },

    // cancelled jobs listing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCancelledJobListRequest(state, action: PayloadAction<JobStatus.CANCELLED>) {
      state.isLoadingCancelledJobs = true;
    },
    getCancelledJobListResponse(state, action: PayloadAction<ICancelledJobListPayload>) {
      state.isLoadingCancelledJobs = false;
      state.cancelledJobs = action.payload.error ? state.cancelledJobs : action.payload.list;
      state.errorCancelledJobs = action.payload.error ? action.payload.error : null;
    },
  },
});

export const jobListingActions = jobListingSlice.actions;
export const jobListingReducers = jobListingSlice.reducer;
