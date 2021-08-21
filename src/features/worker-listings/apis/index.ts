import { JobApplicationStatus } from 'src/constants/status';
import { get, put } from 'src/utils/network';
import { IWorkerListResponse } from './types';

// only worker accepted the offer able to clockIn clockOut
// this endpoint is similar to getAllParticipants endpoint
export const getAllWorkers = (jobId: number): Promise<IWorkerListResponse> =>
  get(`/web/job/${jobId}/participants/${JobApplicationStatus.ACCEPTED}`).then((res) => res.data);

export const updateWorkerDutyInfo = (
  jobId: number,
  data: { employee_id: number; normal_hours_worked: number; rating: number; comments: string; ot_hours_worked: number }, // TODO: make this a interface
): Promise<{}> => put(`web/job/${jobId}/participant/adjust`, data).then((res) => res.data);
