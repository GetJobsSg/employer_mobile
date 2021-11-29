import moment from 'moment';
import { generateSpecialISOString } from 'src/utils/dateTime';
import { IJobDetailsResponse } from './apis/types';
import { ICreateJobRequestPayload, IJobDetailsPayload } from './slice/types';

export const createJobTransformer = {
  toApi(jobData: any): ICreateJobRequestPayload {
    return {
      title: jobData.jobTitle,
      desc: jobData.jobDescription,
      job_category_id: jobData.category || 1,
      dress_code_id: jobData.dresscode || 1,
      start_date: moment(jobData.startDate).toISOString(),
      end_date: moment(jobData.endDate).toISOString(), // we only need to cater single day, start_date and end_date will be the same
      start_time: generateSpecialISOString(moment(jobData.startTime).toISOString()),
      end_time: generateSpecialISOString(moment(jobData.endTime).toISOString()),
      hourly_rate: Number(jobData.hourlyRate),
      hourly_bill_rate: Number(jobData.hourlyRate), // TODO: need to remove when backend make this optional
      vacancy: Number(jobData.vacancy), // TODO: need to remove when backend make this optional
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

export const jobDetailsTransformer = {
  toState(apisData: IJobDetailsResponse): IJobDetailsPayload {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { job, job_locations } = apisData.data;
    return {
      id: job.id,
      // datetime related
      startDate: job.start_date,
      endDate: job.end_date,
      startTime: job.start_time,
      endTime: job.end_time,
      // basic info related
      jobTitle: job.title,
      jobDescription: job.desc,
      hourlyRate: job.hourly_rate,
      vacancy: job.vacancy,
      category: job.job_category.id,
      // location related
      address: job_locations[0].address,
      postalCode: job_locations[0].postal_code,
      blockNo: job_locations[0].block_no,
      unitNo: job_locations[0].unit_no,
    };
  },
};
