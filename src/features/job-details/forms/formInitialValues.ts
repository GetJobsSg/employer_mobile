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
  vacancy = 'vacancy',

  // FormStep.LOCATION_INFO
  address = 'address',
  postalCode = 'postalCode',
  blockNo = 'blockNo',
  unitNo = 'unitNo',
}

export const defaultFormInitialValues = {
  [FieldName.startDate]: undefined,
  [FieldName.endDate]: undefined,
  [FieldName.startTime]: undefined,
  [FieldName.endTime]: undefined,
  [FieldName.jobTitle]: '',
  [FieldName.jobDescription]: '',
  [FieldName.vacancy]: '',
  [FieldName.hourlyRate]: '',
  [FieldName.category]: '',
  [FieldName.dresscode]: '',
  [FieldName.address]: '',
  [FieldName.postalCode]: '',
  [FieldName.blockNo]: '',
  [FieldName.unitNo]: '',
};

export const formInitialValuesFromDb = (jobInfo: any) => ({
  [FieldName.startDate]: jobInfo?.startDate,
  [FieldName.endDate]: jobInfo?.endDate,
  [FieldName.startTime]: `${jobInfo?.startDate} ${jobInfo?.startTime}`,
  [FieldName.endTime]: `${jobInfo?.endDate} ${jobInfo?.endTime}`,
  [FieldName.jobTitle]: jobInfo?.jobTitle,
  [FieldName.jobDescription]: jobInfo?.jobDescription,
  [FieldName.vacancy]: String(jobInfo?.vacancy),
  [FieldName.hourlyRate]: String(jobInfo?.hourlyRate),
  [FieldName.category]: jobInfo?.category,
  [FieldName.dresscode]: jobInfo?.dressCode,
  [FieldName.address]: jobInfo?.address,
  [FieldName.postalCode]: jobInfo?.postalCode,
  [FieldName.blockNo]: jobInfo?.blockNo,
  [FieldName.unitNo]: jobInfo?.unitNo,
});
