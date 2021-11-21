import * as yup from 'yup';
import moment from 'moment';
import { FieldName } from './formInitialValues';

export const formValidationSchema = [
  // Stage 1
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
    [FieldName.endTime]: yup.date().when(FieldName.startTime, (startTime: Date) =>
      yup
        .date()
        .required('Please select end time')
        .test('endTime', 'End time must be later than start time', (endTime) => moment(endTime).isAfter(startTime)),
    ),
  }),

  // Stage 2
  yup.object({
    [FieldName.jobTitle]: yup.string().required('Job title is required'),
    [FieldName.jobDescription]: yup.string().required('Job description is required'),
    [FieldName.hourlyRate]: yup.string().required('Please insert the amount of salary per hour'),
    [FieldName.category]: yup.number().required('Please select a job cateogry'),
    [FieldName.dresscode]: yup.number().required('Please select a dresscode'),
  }),

  // Stage 3
  yup.object({
    [FieldName.requirement]: yup.string().required('Please input job requirement'),
  }),

  // Stage 4
  yup.object({
    [FieldName.responsiblities]: yup.string().required('Please input job responsibilities'),
  }),

  // Stage 5
  yup.object({
    [FieldName.address]: yup.string().required('Please insert the address'),
    [FieldName.postalCode]: yup.string().required('Please insert postal code'),
    [FieldName.blockNo]: yup.string(),
    [FieldName.unitNo]: yup.string().required('Please insert  unit number'),
  }),
];
