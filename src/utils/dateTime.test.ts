import { getCalendarDay } from './dateTime';

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
