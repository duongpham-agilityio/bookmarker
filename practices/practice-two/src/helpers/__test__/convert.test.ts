import {
  convertTimeToDate,
  convertDateTimeToTimeString,
  convertStringToTime,
} from 'helpers';

describe('Convert', () => {
  it('convert time to date', () => {
    const date = 1700438400000;
    const one = convertTimeToDate(date);
    const two = convertTimeToDate(1693872000000);

    expect(one).toBe('2023-11-20');
    expect(two).toBe('2023-09-05');
  });

  it('convert time to date with format = true', () => {
    const one = convertTimeToDate(1700438400000, '-', true);
    const two = convertTimeToDate(1693872000000, '-', true);

    expect(two).toBe('05-09-2023');
    expect(one).toBe('20-11-2023');
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

  it('convert DateTime to TimeString with hours > 12', () => {
    const date = 1694584147893;

    const result = convertDateTimeToTimeString(date);

    expect(result).toBe('12:49 PM');
  });
});
