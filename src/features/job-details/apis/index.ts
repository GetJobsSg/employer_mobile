import { post } from 'src/utils/network';
import { ICreateJobRequestPayload } from '../slice/types';

export const createJob = (data: ICreateJobRequestPayload): Promise<{}> =>
  post(`/web/job`, data).then((res) => res.data);
