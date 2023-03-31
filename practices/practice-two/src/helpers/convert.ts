export const convertTimeToDate = (time: number): string => {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

export const convertStringToTime = (string: string) => {
  const date = new Date(string);

  return date.getTime();
};
