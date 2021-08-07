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
        const mStartDate = moment(startDate);
        const mNow = moment(new Date());
        return moment(mStartDate).isSameOrAfter(mNow);
      }),
    [FieldName.endDate]: yup
      .date()
      .required('Please select a date')
      .test('endDate', 'Please select a future date', (endDate) => {
        const mEndDate = moment(endDate);
        const mNow = moment(new Date());
        return moment(mEndDate).isSameOrAfter(mNow);
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
    [FieldName.jobTitle]: yup.string().required(),
    [FieldName.jobDescription]: yup.string().required(),
    [FieldName.hourlyRate]: yup.string().required(),
  }),

  // Stage 3
  yup.object({
    [FieldName.requirement]: yup.string().required(),
  }),

  // Stage 4
  yup.object({
    [FieldName.responsiblities]: yup.string().required(),
  }),

  // Stage 5
  yup.object({
    [FieldName.address]: yup.string().required(),
    [FieldName.postalCode]: yup.string().required(),
    [FieldName.blockNo]: yup.string(),
    [FieldName.unitNo]: yup.string().required(),
  }),
];
