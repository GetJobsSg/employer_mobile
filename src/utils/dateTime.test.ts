import { generateSpecialISOString, getCalendarDay } from './dateTime';

describe('getCalendarDay', () => {
  const sample1 = '2021-07-23T00:00:00+08:00';
  const sample2 = '2021-07-14';

  test(`${sample1} should return Fri`, () => {
    expect(getCalendarDay(sample1)).toBe('Fri');
  });

  test(`${sample2} should return Wed`, () => {
    expect(getCalendarDay(sample2)).toBe('Wed');
  });
});

describe('generateSpecialISOString', () => {
  const sample0 = '2021-08-16T23:00:00.000Z'; // 7am => 2021-08-16T07:00:00.000Z
  const sample1 = '2021-08-16T00:00:00.000Z'; // 8am => 2021-08-16T08:00:00.000Z
  const sample2 = '2021-08-16T18:00:00.000Z'; // 2am => 2021-08-16T02:00:00.000Z

  test(`${sample0} should return 2021-08-16T07:00:00.000Z`, () => {
    expect(generateSpecialISOString(sample0)).toBe('2021-08-16T07:00:00.000Z');
  });

  test(`${sample1} should return 2021-08-16T08:00:00.000Z`, () => {
    expect(generateSpecialISOString(sample1)).toBe('2021-08-16T08:00:00.000Z');
  });

  test(`${sample2} should return 2021-08-16T16:00:00.000Z`, () => {
    expect(generateSpecialISOString(sample2)).toBe('2021-08-16T02:00:00.000Z');
  });
});
