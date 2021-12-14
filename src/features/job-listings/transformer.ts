import { JobApplicationStatus } from 'src/constants/status';
import { constructJobDate, convertTimeToAmPm } from 'src/utils/dateTime';
import { IJobResponse } from './apis/types';
import { IJobActive } from './slice/types';

export const jobListingTransformer = {
  toState(data: IJobResponse[]): IJobActive[] {
    if (!data) return [];
    return data.map((item) => {
      const { job } = item;
      return {
        id: job.id,
        title: job.title || '',
        startDate: job.start_date || '',
        endDate: job.end_date || '',
        formattedDate: constructJobDate(job.start_date, job.end_date) || '',
        startTime: convertTimeToAmPm(job.start_time) || '',
        endTime: convertTimeToAmPm(job.end_time) || '',
        startCode: job.start_code || null,
        endCode: job.end_code || null,
        hourlyRate: job.hourly_rate || 0,
        company: {
          id: job.company.id,
          name: job.company.name,
        },
        jobCategoryId: {
          id: job.job_category.id,
          name: job.job_category.name,
        },
        totalAcceptedCount: item.job_participants.filter(
          (p) => p.job_application_status.id === JobApplicationStatus.ACCEPTED,
        ).length,
        totalOfferedCount: item.job_participants.filter(
          (p) => p.job_application_status.id === JobApplicationStatus.OFFERED,
        ).length,
      };
    });
  },
};
