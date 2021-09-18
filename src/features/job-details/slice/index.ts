import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonTypes } from 'src/shared';
import { ICategory, ICreateJobResponsePayload, IJobDetailsResponsePayload } from './types';
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
    createJobResponse(state, action: PayloadAction<ICreateJobResponsePayload>) {
      state.isLoadingCreateJob = false;
      state.errorCreateJob = action.payload.error ? action.payload.error : null;
    },

    // get job details
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getJobDetailsRequest(state, action: PayloadAction<CommonTypes.ICommonJobRequest>) {
      state.isLoadingGetJobDetails = true;
    },
    getJobDetailsResponse(state, action: PayloadAction<IJobDetailsResponsePayload>) {
      state.isLoadingGetJobDetails = false;
      state.jobDetails = action.payload.error ? state.jobDetails : action.payload.data;
      state.errorJobDetails = action.payload.error ? action.payload.error : null;
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
