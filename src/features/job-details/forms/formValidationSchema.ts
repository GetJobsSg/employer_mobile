import * as yup from 'yup';
import moment from 'moment';
import { FieldName } from './formInitialValues';

export const formValidationSchema = [
  // Step 1
  yup.object({
    [FieldName.startDate]: yup
      .date()
      .required('Please select a date')
      .test('startDate', 'Please select a future date', (startDate) => {
        const mStartDate = moment(startDate).startOf('days');
        const mToday = moment(new Date()).startOf('days');
        return moment(mStartDate).isSameOrAfter(mToday);
      }),
    [FieldName.endDate]: yup
      .date()
      .required('Please select a date')
      .test('endDate', 'Please select a future date', (endDate) => {
        const mEndDate = moment(endDate);
        const mToday = moment(new Date()).startOf('days');
        return moment(mEndDate).isSameOrAfter(mToday);
      }),
    [FieldName.startTime]: yup.date().required('Please select start time'),
    [FieldName.endTime]: yup.date().required('Please select end time'),
  }),

  // Step 2
  yup.object({
    [FieldName.jobTitle]: yup.string().required('Job title is required'),
    [FieldName.jobDescription]: yup.string().required('Job description is required'),
    [FieldName.hourlyRate]: yup.string().required('Please insert the amount of salary per hour'),
    [FieldName.vacancy]: yup
      .string()
      .required('Please insert number of vacancy needed')
      .test('vacancy', 'Vacancy count must greater than 0', (vacancy) => Number(vacancy) !== 0),
    [FieldName.category]: yup.number().required('Please select a job cateogry'),
    [FieldName.dresscode]: yup.number().required('Please select a dresscode'),
  }),

  // Step 3
  yup.object({
    [FieldName.address]: yup.string().required('Please insert the address'),
    [FieldName.postalCode]: yup.string().required('Please insert postal code'),
    [FieldName.blockNo]: yup.string(),
    [FieldName.unitNo]: yup.string().required('Please insert  unit number'),
  }),
];
