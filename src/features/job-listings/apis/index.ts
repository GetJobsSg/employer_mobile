import { get } from 'src/utils/network';
import { JobStatus } from 'src/constants/status';
import { IJobListResponse } from './types';

export const getJobList = (jobStatus: JobStatus): Promise<IJobListResponse> =>
  get(`/web/job`, { params: { job_status: jobStatus } }).then((res) => res.data);
