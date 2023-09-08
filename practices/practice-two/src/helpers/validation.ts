/**
 * Data validation of an object
 * @param object
 * @returns
 */
export const validate = (object: {
  [key: string]: string | number | undefined;
}) => {
  let isError = false;

  Object.values(object).forEach((value) => {
    if (!value) {
      isError = true;

      return;
    }
  });

  return isError;
};
