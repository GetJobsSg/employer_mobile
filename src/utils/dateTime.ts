import moment from 'moment';
import { DD_MMM } from 'src/constants/dateTime';

export const getAge = (birthDate: string) => {
  if (!birthDate) return '';
  const mBirthDate = moment(birthDate);
  return moment().diff(mBirthDate, 'years');
};

export const isSameDay = (date1: string, date2: string) => {
  const m1 = moment(date1);
  const m2 = moment(date2);
  return m1.isSame(m2, 'day');
};

export const getCalendarDay = (date: string) => {
  const momentDate = moment(date);
  const dayIndex = momentDate.isoWeekday(); // {1: mon, 2: tues ......}
  const week = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  return week[dayIndex - 1];
};

// eg: 09:00:00 => 9:00am, 17:00:00 => 11am 17:00pm
export const convertTimeToAmPm = (time: string) => {
  if (!time) return '';
  const [hh, mm] = time.split(':');
  if (Number(hh) < 12) return `${hh}:${mm}am`;
  return `${hh}:${mm}pm`;
};

export const constructJobDate = (startDate: string, endDate: string, format = DD_MMM) => {
  const formattedStartDate = moment(startDate).format(format);
  const formattedEndDate = moment(endDate).format(format);
  if (isSameDay(startDate, endDate)) return `${formattedStartDate} (${getCalendarDay(startDate)})`;

  const cStartDay = getCalendarDay(startDate);
  const cEndDay = getCalendarDay(endDate);
  return `${formattedStartDate} (${cStartDay})  - ${formattedEndDate} (${cEndDay})`;
};
