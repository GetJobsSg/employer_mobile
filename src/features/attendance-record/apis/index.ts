import { get, put } from 'src/utils/network';
import { IWorkingDataRequestPayload } from '../slice/types';
import { IAttendanceAllRes } from './types';

export const getAttendanceRecord = (jobId: number): Promise<IAttendanceAllRes> =>
  get(`/web/job/${jobId}/attendance/all`).then((res) => res.data);

export const adjustWorkingData = (jobId: number, data: IWorkingDataRequestPayload): Promise<{}> =>
  put(`/web/job/${jobId}/participant/adjust`, data).then((res) => res.data);
