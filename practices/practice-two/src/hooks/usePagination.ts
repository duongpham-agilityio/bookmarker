import { useCallback, useMemo } from 'react';
import { useSearchParam } from 'hooks';

// Types
import { Book } from 'types';
import { RECORD } from '@constants';

export const usePagination = (products: Book[] = []) => {
  const { param, setSearchParam } = useSearchParam();

  /**
   * Calculate the number of pages to RECORD
   */
  const pagination = useMemo(() => {
    const filtersLength = products.length;
    const isSizePage = filtersLength % RECORD;
    const sizePage = Math.floor(filtersLength / RECORD);

    if (!isSizePage) {
      return new Array(sizePage).fill(0);
    }

    return new Array(sizePage + 1).fill(0);
  }, [products, RECORD]);

  /**
   * Get products by page
   */
  const filters = useMemo(() => {
    const { page: paramPage } = param;
    const filteredProducts = products.filter((product) => {
      const index = products.indexOf(product);
      const isStartIndex = index >= (paramPage - 1) * RECORD;
      const isEndIndex = index < paramPage * RECORD;
      const condition = isStartIndex && isEndIndex;

      return condition;
    });

    return filteredProducts;
  }, [products, RECORD, param]);

  /**
   * Go to the page you want to see
   * @param page Pages to see
   */
  const changePageByValue = useCallback(
    (page: number) => {
      setSearchParam('page', `${page}`);
    },
    [setSearchParam]
  );

  return {
    data: filters,
    pagination,
    changePageByValue,
  };
};
