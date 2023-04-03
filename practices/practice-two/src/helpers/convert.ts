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

export const convertStringToTime = (string: string) => {
  const date = new Date(string);

  return date.getTime();
};

export const convertDateTimeToTimeString = (time: number) => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  if (hour > 11) {
    return `${hour > 12 ? hour - 12 : hour}:${minute} PM`;
  }

  return `${hour}:${minute} AM`;
};
