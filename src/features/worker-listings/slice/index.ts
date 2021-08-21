import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { workerListingInitialState } from './defaultState';
import { IWorkerListPayload } from './types';

const workerListingSlice = createSlice({
  name: 'workerListing',
  initialState: workerListingInitialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllWorkerRequest(state, action: PayloadAction<{ jobId: number }>) {
      state.isLoadingAllWorkers = true;
    },
    getAllWorkerResponse(state, action: PayloadAction<IWorkerListPayload>) {
      state.isLoadingAllWorkers = false;
      state.allWorkers = action.payload.error ? state.allWorkers : action.payload.list;
      state.errorAllWorkers = action.payload.error ? action.payload.error : null;
    },
  },
});

export const workerListingActions = workerListingSlice.actions;
export const workerListingReducers = workerListingSlice.reducer;
