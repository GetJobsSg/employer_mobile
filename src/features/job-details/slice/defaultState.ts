import { IJobDetailInitialState } from './types';

export const jobDetailInitialState: IJobDetailInitialState = {
  // create
  isLoadingCreateJob: false,
  errorCreateJob: null,

  // get job details
  isLoadingGetJobDetails: false,
  jobDetails: {
    id: 0,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    jobTitle: '',
    jobDescription: '',
    hourlyRate: 0,
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
