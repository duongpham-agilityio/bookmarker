import {
  convertTimeToDate,
  convertDateTimeToTimeString,
  convertStringToTime,
} from 'helpers';

describe('Convert', () => {
  it('convert time to date', () => {
    const date = new Date();
    const result = convertTimeToDate(date.getTime());

    expect(result).toBe('2023-04-04');
  });

  it('convert string to time', () => {
    const date = new Date('2023-04-04');
    const result = convertStringToTime('2023-04-04');

    expect(result).toBe(date.getTime());
  });

  it('convert DateTime to TimeString', () => {
    const date = new Date();
    const result = convertDateTimeToTimeString(date.getTime());

    expect(result).toBe('2:38 PM');
  });
});
