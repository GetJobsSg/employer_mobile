import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ICreateJobResponsePayload } from './types';
import { jobDetailInitialState } from './defaultState';

const jobDetailSlice = createSlice({
  name: 'jobDetails',
  initialState: jobDetailInitialState,
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

    // get all job categories
    getAllCategoriesRequest(state) {
      state.isLoadingGetAllCategories = true;
    },
    getAllCategoriesResponse(
      state,
      action: PayloadAction<{
        list: Pick<ICategory, 'id' | 'name'>[];
        error: any | null;
      }>,
    ) {
      state.isLoadingGetAllCategories = false;
      state.allCategoriesErr = action.payload.error ? action.payload.error : null;
      state.allCategories = action.payload.error ? state.allCategories : action.payload.list;
    },
  },
});

export const jobDetailsActions = jobDetailSlice.actions;
export const jobDetailsReducers = jobDetailSlice.reducer;
