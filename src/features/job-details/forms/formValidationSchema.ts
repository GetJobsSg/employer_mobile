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
