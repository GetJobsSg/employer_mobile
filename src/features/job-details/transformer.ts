import moment from 'moment';
import { ICreateJobRequestPayload } from './slice/types';

export const createJobTransformer = {
  toApi(jobData: any): ICreateJobRequestPayload {
    return {
      title: jobData.jobTitle,
      desc: jobData.jobDescription,
      job_category_id: jobData.category || 1,
      requirements: jobData.requirement,
      responsibilities: jobData.responsibilities,
      start_date: moment(jobData.startDate).toISOString(),
      end_date: moment(jobData.endDate).toISOString(), // we only need to cater single day, start_date and end_date will be the same
      start_time: moment(jobData.startTime).toISOString(),
      end_time: moment(jobData.endTime).toISOString(),
      hourly_rate: Number(jobData.hourlyRate),
      hourly_bill_rate: Number(jobData.hourlyRate), // TODO: need to remove when backend make this optional
      job_location: [
        {
          address: jobData.address,
          postal_code: jobData.postalCode,
          block_no: jobData.blockNo,
          unit_no: jobData.unitNo,
        },
      ],
    };
  },
};
