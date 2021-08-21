import { IWorkerListingInitialState } from './types';

export const workerListingInitialState: IWorkerListingInitialState = {
  isLoadingAllWorkers: false,
  allWorkers: [],
  errorAllWorkers: null,
};
