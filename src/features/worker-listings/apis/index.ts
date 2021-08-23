import { get, put } from 'src/utils/network';
import { IWorkerListResponse } from './types';

export const getAllWorkers = (jobId: number): Promise<IWorkerListResponse> =>
  get(`/web/job/attendance/participant/${jobId}`).then((res) => res.data);

export const updateWorkerDutyInfo = (
  jobId: number,
  data: { employee_id: number; normal_hours_worked: number; rating: number; comments: string; ot_hours_worked: number }, // TODO: make this a interface
): Promise<{}> => put(`web/job/${jobId}/participant/adjust`, data).then((res) => res.data);
