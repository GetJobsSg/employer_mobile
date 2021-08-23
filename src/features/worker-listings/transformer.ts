import { getAge } from 'src/utils/dateTime';
import { IWorkerListResponse } from './apis/types';
import { IWorker } from './slice/types';

export const workerTransformer = {
  toState: (res: IWorkerListResponse): IWorker[] =>
    res.data.map((worker) => ({
      id: worker.id,
      jobseekerId: worker.job_participant_id,
      name: `${worker.job_participant.employee.first_name} ${worker.job_participant.employee.last_name}`,
      gender: worker.job_participant.employee.gender || '',
      age: getAge(worker.job_participant.employee.dob) || 0,
      ratings: worker.job_participant.rating || 0,
      profileImage: worker.job_participant.employee.profile_img || '',
      mobile: worker.job_participant.employee.mobile || '',
      clockInTime: worker.clock_in_time || null,
      clockOutTime: worker.clock_out_time || null,
    })),
};
