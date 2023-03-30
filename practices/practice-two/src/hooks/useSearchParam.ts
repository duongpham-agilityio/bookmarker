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
      name: searchParams.get('search') || PARAM_DEFAULT.SEARCH,
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
      const searchValue: { [key: string]: string } = {};

      searchParams.forEach((value, key) => {
        if (value) {
          searchValue[key] = value;
        }
      });

      setSearchParams({
        ...searchValue,
        [key]: value,
      });
    },
    [param, setSearchParams]
  );

  return {
    param: {
      ...param,
      page: parseInt(param.page),
    },
    setSearchParam,
  };
};
