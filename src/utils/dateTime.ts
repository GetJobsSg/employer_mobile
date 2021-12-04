import moment from 'moment';
import { DD_MMM } from 'src/constants/dateTime';

export const getAge = (birthDate: string) => {
  if (!birthDate) return 0;
  const mBirthDate = moment(birthDate);
  return moment().diff(mBirthDate, 'years');
};

export const addHoursMinFromDate = (fromDate: string, hours: number, minutes: number) =>
  moment(fromDate).add(hours, 'hours').add(minutes, 'minutes');

export const isSameDay = (date1: string, date2: string) => {
  const m1 = moment(date1);
  const m2 = moment(date2);
  return m1.isSame(m2, 'day');
};

export const getCalendarDay = (date: string | Date) => {
  const momentDate = moment(date);
  const dayIndex = momentDate.isoWeekday(); // {1: mon, 2: tues ......}
  const week = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  return week[dayIndex - 1];
};

// eg: 09:00:00 => 9:00am, 17:00:00 => 17:00pm
export const convertTimeToAmPm = (time: string) => {
  if (!time) return '';
  const [hh, mm] = time.split(':');
  if (Number(hh) < 12) return `${hh}:${mm}am`;
  return `${hh}:${mm}pm`;
};

// eg: special handler - convert 2021-08-16T02:00:00.000Z (10am SG time) to 2021-08-16T10:00:00.000Z
// backend will grab whatever value in between 'T' and '.000Z',
export const generateSpecialISOString = (isoDateTime: string) => {
  const hours = moment(isoDateTime).hours();
  const mins = moment(isoDateTime).minutes();

  const formatHours = () => (hours < 10 ? `0${hours}` : hours);
  const formatMins = () => (mins < 10 ? `0${mins}` : mins);

  const timeContent = `${formatHours()}:${formatMins()}:00`;
  const dateContent = isoDateTime.split('T')[0];

  return `${dateContent}T${timeContent}.000Z`;
};

export const constructJobDate = (startDate: string, endDate: string, format = DD_MMM) => {
  const formattedStartDate = moment(startDate).format(format);
  const formattedEndDate = moment(endDate).format(format);
  if (isSameDay(startDate, endDate)) return `${formattedStartDate} (${getCalendarDay(startDate)})`;

  const cStartDay = getCalendarDay(startDate);
  const cEndDay = getCalendarDay(endDate);
  return `${formattedStartDate} (${cStartDay})  - ${formattedEndDate} (${cEndDay})`;
};

export const getHoursAndMins = (decimalHour: number) => {
  const totalMins = decimalHour * 60;
  const numberOfHours = Math.floor(totalMins / 60);
  const numberOfMins = totalMins % 60;

  const hourUnitLabel = numberOfHours > 1 ? 'hours' : 'hour';
  const minUnitLabel = numberOfMins > 1 ? 'mins' : 'min';

  return `${numberOfHours} ${hourUnitLabel}, ${numberOfMins} ${minUnitLabel}`;
};
