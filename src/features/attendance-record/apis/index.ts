import { get } from 'src/utils/network';

export const getAttendanceRecord = (jobId: number) => get(`/web/job/${jobId}/attendance/all`).then((res) => res.data);
