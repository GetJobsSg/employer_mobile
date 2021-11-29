export enum FormStep {
  DATETIME_INFO,
  BASIC_INFO,
  LOCATION_INFO,
  PREVIEW,
}

export enum FieldName {
  // FormStep.DATETIME_INFO
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',

  // FormStep.BASIC_INFO
  jobTitle = 'jobTitle',
  jobDescription = 'jobDescription',
  hourlyRate = 'hourlyRate',
  category = 'category',
  dresscode = 'dresscode',

  // FormStep.LOCATION_INFO
  address = 'address',
  postalCode = 'postalCode',
  blockNo = 'blockNo',
  unitNo = 'unitNo',
}

export const formInitialValues = {
  [FieldName.startDate]: undefined,
  [FieldName.endDate]: undefined,
  [FieldName.startTime]: undefined,
  [FieldName.endTime]: undefined,
  [FieldName.jobTitle]: '',
  [FieldName.jobDescription]: '',
  [FieldName.hourlyRate]: '',
  [FieldName.category]: '',
  [FieldName.dresscode]: '',
  [FieldName.address]: '',
  [FieldName.postalCode]: '',
  [FieldName.blockNo]: '',
  [FieldName.unitNo]: '',
};
