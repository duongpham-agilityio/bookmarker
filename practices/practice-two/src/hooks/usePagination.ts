import { useMemo } from 'react';

// Types
import { Book } from 'types';

// Constants
import { RECORD } from '@constants';

export const usePagination = (products: Book[] = [], page: number) => {
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
  }, [products]);

  /**
   * Get products by page
   */
  const filters = useMemo(() => {
    const filteredProducts = products.filter((product) => {
      const index = products.indexOf(product);
      const isStartIndex = index >= (page - 1) * RECORD;
      const isEndIndex = index < page * RECORD;
      const condition = isStartIndex && isEndIndex;

      return condition;
    });

    return filteredProducts;
  }, [products, page]);

  return {
    data: filters,
    pagination,
  };
};
