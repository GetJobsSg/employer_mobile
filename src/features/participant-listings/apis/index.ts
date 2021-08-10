import { get, put } from 'src/utils/network';
import { JobApplicationStatus } from 'src/constants/status';
import { IParticipantListResponse } from './types';
import { IOfferJobPayload, IRejectPayload } from '../slice/types';

export const getAllParticipants = (
  jobId: number,
  applicationStatus: JobApplicationStatus,
): Promise<IParticipantListResponse> =>
  get(`/web/job/${jobId}/participants/${applicationStatus}`).then((res) => res.data);

export const sendParticipantOffer = (data: IOfferJobPayload) =>
  put(`/web/job/offer`, { jobId: data.jobId, employee_id: data.jobseekerId }).then((res) => res.data);

// export const sendParticipantOffer = (data: IOfferJobPayload) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 3000);
//   });

export const rejectParticipant = (data: IRejectPayload) =>
  put(`/web/job/cancel/${data.jobId}/employee/${data.jobseekerId}`).then((res) => res.data);
