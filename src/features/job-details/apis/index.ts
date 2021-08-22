import { get, post } from 'src/utils/network';
import { ICreateJobRequestPayload, IGetAllCategoriesResponse } from '../slice/types';
import { IJobDetailsResponse } from './types';

export const getJobDetails = (jobId: number): Promise<IJobDetailsResponse> =>
  get(`/web/job/${jobId}`).then((res) => res.data);

export const createJob = (data: ICreateJobRequestPayload): Promise<{}> =>
  post(`/web/job`, data).then((res) => res.data);

export const getAllCategories = (): Promise<IGetAllCategoriesResponse> =>
  get(`/job/categories`).then((res) => res.data);
