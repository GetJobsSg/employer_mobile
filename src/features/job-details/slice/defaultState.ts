import { IJobDetailInitialState } from './types';

export const jobDetailInitialState: IJobDetailInitialState = {
  // create
  isLoadingCreateJob: false,
  errorCreateJob: null,

  // get job details
  isLoadingGetJobDetails: false,

  // getAll categories
  isLoadingGetAllCategories: false,
  allCategories: [],
  allCategoriesErr: null,
};
