import { get, post } from 'src/utils/network';
import { ICreateJobRequestPayload, IGetAllCategoriesResponse } from '../slice/types';

export const createJob = (data: ICreateJobRequestPayload): Promise<{}> =>
  post(`/web/job`, data).then((res) => res.data);

export const getAllCategories = (): Promise<IGetAllCategoriesResponse> =>
  get(`/job/categories`).then((res) => res.data);
