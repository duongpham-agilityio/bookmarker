import {
  convertTimeToDate,
  convertDateTimeToTimeString,
  convertStringToTime,
} from 'helpers';

describe('Convert', () => {
  it('convert time to date', () => {
    const date = 1680662612195;
    const result = convertTimeToDate(date);

    expect(result).toBe('2023-04-05');
  });

  it('convert string to time', () => {
    const date = new Date('2023-04-04');
    const result = convertStringToTime('2023-04-04');

    expect(result).toBe(date.getTime());
  });

  it('convert DateTime to TimeString', () => {
    const date = 1680662612195;

    const result = convertDateTimeToTimeString(date);

    expect(result).toBe('9:43 AM');
  });
});
