import { getAge } from 'src/utils/dateTime';
import { IWorkerListResponse } from './apis/types';
import { IWorker } from './slice/types';

export const workerTransformer = {
  toState: (res: IWorkerListResponse): IWorker[] =>
    res.data.map((worker) => ({
      id: worker.id,
      jobseekerId: worker.employee.id,
      name: `${worker.employee.first_name} ${worker.employee.last_name}`,
      gender: worker.employee.gender || '',
      age: getAge(worker.employee.dob) || 0,
      ratings: worker.rating ? Number(worker.rating.toFixed(2)) : 0,
      profileImage: worker.employee.profile_img || '',
      mobile: worker.employee.mobile || '',
      clockInTime: null, // TODO: pending backend
      clockOutTime: null, // TODO: pending backend
    })),
};
