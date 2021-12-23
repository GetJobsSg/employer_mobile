import { IJobDetailInitialState } from './types';

export const jobDetailInitialState: IJobDetailInitialState = {
  // create
  isLoadingCreateJob: false,
  errorCreateJob: null,

  // get job details
  isLoadingGetJobDetails: false,
  info: {
    id: 0,
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    jobTitle: '',
    jobDescription: '',
    hourlyRate: 0,
    vacancy: 0,
    category: 0,
    address: '',
    postalCode: '',
    blockNo: '',
    unitNo: '',
  },
  errorJobDetails: null,

  // getAll categories
  isLoadingGetAllCategories: false,
  allCategories: [],
  allCategoriesErr: null,

  // getAll dresscodes
  isLoadingGetAllDresscode: false,
  allDresscode: [],
  allDresscodeErr: null,
};
