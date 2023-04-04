import { PARAM_DEFAULT } from '@constants';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Get value search parameters
   */
  const param = useMemo(() => {
    const param = {
      page: searchParams.get('page') || PARAM_DEFAULT.PAGE,
      name: searchParams.get('name') || PARAM_DEFAULT.SEARCH,
      sort: searchParams.get('sort') || PARAM_DEFAULT.SORT,
    };

    return param;
  }, [searchParams]);

  /**
   * Update search value on path
   * @param key search parameter
   * @param value search value
   */
  const setSearchParam = useCallback(
    (key: keyof typeof param, value: string) => {
      const searchValue: { [key: string]: string } = {
        ...param,
        [key]: value,
      };

      Object.entries(searchValue).forEach(([key, value]) => {
        if (!value) {
          delete searchValue[key];
        }
      });

      setSearchParams(searchValue);
    },
    [param, setSearchParams]
  );

  const convertSearchParamsToString = useCallback(
    (searchKey: keyof typeof param, searchValue: string) => {
      const obj: { [key: string]: string } = {
        ...param,
        [searchKey]: searchValue,
      };
      const url = Object.entries(obj).reduce((data, [key, value]) => {
        if (value) {
          return `${data}${key}=${value}&`;
        }
        return data;
      }, '?');

      return url.substring(0, url.length - 1);
    },
    [param]
  );

  return {
    param: {
      ...param,
      page: parseInt(param.page),
    },
    setSearchParam,
    convertSearchParamsToString,
  };
};
