import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateJobResponsePayload } from './types';

const jobDetailSlice = createSlice({
  name: 'jobDetails',
  initialState: {
    isLoadingCreateJob: false,
    errorCreateJob: null,

    isLoadingGetJobDetails: false,
  },
  reducers: {
    // create job
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createJobRequest(state, action: PayloadAction<any>) {
      state.isLoadingCreateJob = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createJobResponse(state, action: PayloadAction<ICreateJobResponsePayload>) {
      state.isLoadingCreateJob = false;
      state.errorCreateJob = action.payload.error ? action.payload.error : null;
    },

    // get job details
    getJobRequest(state) {
      state.isLoadingGetJobDetails = true;
    },
    getJobResponse(state) {
      state.isLoadingGetJobDetails = false;
    },
  },
});

export const jobDetailsActions = jobDetailSlice.actions;
export const jobDetailsReducers = jobDetailSlice.reducer;
