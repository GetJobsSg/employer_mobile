import { get } from 'src/utils/network';
import { IAttendanceAllRes } from './types';

export const getAttendanceRecord = (jobId: number): Promise<IAttendanceAllRes> =>
  get(`/web/job/${jobId}/attendance/all`).then((res) => res.data);
