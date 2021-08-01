export enum FieldName {
  // Stage 1
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',

  // Stage 2
  jobTitle = 'jobTitle',
  jobDescription = 'jobDescription',
  hourlyRate = 'hourlyRate',

  // Stage 3
  requirement = 'requirement',

  // Stage 4
  responsiblities = 'responsibilities',

  // Stage 5
  address = 'address',
  postalCode = 'postalCode',
  blockNo = 'blockNo',
  unitNo = 'unitNo',
}

export const formInitialValues = [
  // Stage 1
  {
    [FieldName.startDate]: undefined,
    [FieldName.endDate]: undefined,
    [FieldName.startTime]: undefined,
    [FieldName.endTime]: undefined,
  },

  // Stage 2
  {
    [FieldName.jobTitle]: '',
    [FieldName.jobDescription]: '',
    [FieldName.hourlyRate]: '',
  },

  // Stage 3
  {
    [FieldName.requirement]: '',
  },

  // Stage 4
  {
    [FieldName.responsiblities]: '',
  },

  // Stage 5
  {
    [FieldName.address]: '',
    [FieldName.postalCode]: '',
    [FieldName.blockNo]: '',
    [FieldName.unitNo]: '',
  },
];
