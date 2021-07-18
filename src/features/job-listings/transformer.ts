import { IJobResponse } from './apis/types';
import { IJobActive } from './slice/types';

export const activeJobTransformer = {
  toState(data: IJobResponse[]): IJobActive[] {
    if (!data) return [];
    return data.map((item) => {
      const { job } = item;
      return {
        id: job.id,
        title: job.title || '',
        startDate: job.start_date || '',
        endDate: job.end_date || '',
        startTime: job.start_time || '',
        endTime: job.end_time || '',
        hourlyRate: job.hourly_rate || 0,
        company: {
          id: job.company.id,
          name: job.company.name,
        },
        jobCategoryId: {
          id: job.job_category.id,
          name: job.job_category.name,
        },
      };
    });
  },
};
