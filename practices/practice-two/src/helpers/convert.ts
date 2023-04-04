/**
 * Convert numeric time to string
 * @param time numeric time
 * @param slug The separator character in the middle
 * @param format true (dd/mm/yyy) , false (yyyy/mm/dd)
 * @returns string
 */
export const convertTimeToDate = (
  time: number,
  slug = '-',
  format = false
): string => {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (format)
    return `${day < 10 ? `0${day}` : day}${slug}${
      month < 10 ? `0${month}` : month
    }${slug}${year}`;

  return `${year}${slug}${month < 10 ? `0${month}` : month}${slug}${
    day < 10 ? `0${day}` : day
  }`;
};

/**
 * String time conversion
 * @param string date
 * @returns number
 */
export const convertStringToTime = (string: string) => {
  const date = new Date(string);

  return date.getTime();
};

/**
 * Convert numeric time to hours
 * @param time number
 * @returns string
 */
export const convertDateTimeToTimeString = (time: number) => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  if (hour > 11) {
    return `${hour > 12 ? hour - 12 : hour}:${minute} PM`;
  }

  return `${hour}:${minute} AM`;
};
