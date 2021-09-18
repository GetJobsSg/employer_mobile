/* eslint-disable @typescript-eslint/naming-convention */
import { getAge } from 'src/utils/dateTime';
import { IAttendanceAllRes } from './apis/types';
import { IAttendanceRecord } from './slice/types';

export const attendanceRecordTransformer = {
  toState(res: IAttendanceAllRes): IAttendanceRecord[] {
    if (!res.data) return [];

    // since we only target single day job, always grab from index 0
    return res.data[0].map((attendee) => {
      const {
        job_participant,
        job_participant: { employee },
      } = attendee;
      return {
        id: attendee.id,
        jobseekerId: attendee.job_participant.employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
        gender: employee.gender,
        age: getAge(employee.dob) || 0,
        ratings: job_participant.rating,
        profileImage: employee.profile_img,
        mobile: employee.mobile,
        clockInTime: attendee.clock_in_time,
        clockOutTime: attendee.clock_out_time,
        normalHoursWorked: job_participant.normal_hours_worked,
        otHoursWorked: job_participant.ot_hours_worked,
      };
    });
  },
};
