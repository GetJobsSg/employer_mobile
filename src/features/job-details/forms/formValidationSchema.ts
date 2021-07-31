import * as yup from 'yup';
import { FieldName } from './formInitialValues';

export const formValidationSchema = [
  // Stage 1
  yup.object({
    [FieldName.startDate]: yup.date().required(),
    // [FieldName.endDate]: yup.date().required(),
    [FieldName.startTime]: yup.date().required(),
    [FieldName.endTime]: yup.date().required(),
  }),

  // Stage 2
];
