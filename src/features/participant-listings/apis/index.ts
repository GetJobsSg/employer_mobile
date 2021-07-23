import { get } from 'src/utils/network';
import { JobApplicationStatus } from 'src/constants/status';
import { IParticipantListResponse } from './types';

export const getAllParticipants = (
  jobId: number,
  applicationStatus: JobApplicationStatus,
): Promise<IParticipantListResponse> =>
  get(`/web/job/${jobId}/participants/${applicationStatus}`).then((res) => res.data);
