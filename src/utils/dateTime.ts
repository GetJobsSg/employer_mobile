import moment from 'moment';

export const getAge = (birthDate: string) => {
  if (!birthDate) return '';
  const mBirthDate = moment(birthDate);
  return moment().diff(mBirthDate, 'years');
};
