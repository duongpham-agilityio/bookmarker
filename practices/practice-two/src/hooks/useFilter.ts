import { SORT } from '@constants';
import { useMemo } from 'react';
import { Book } from 'types';

export type Filter = {
  name: string;
  sort: string;
};

/**
 * Filter books on demand
 * @param data book list
 * @param filter filter option
 * @returns book list after filtering
 */
export const useFilter = (data: Book[], filter: Filter) => {
  /**
   * Sort books on demand
   */
  const sorts = useMemo(() => {
    const newBooks = [...data];
    if (!filter.sort) return data;

    if (filter.sort === SORT.ASCENDING) {
      newBooks.sort(function (a, b) {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
      });

      return newBooks;
    }

    newBooks.sort(function (a, b) {
      if (a.name < b.name) return 1;

      if (a.name > b.name) return -1;

      return 0;
    });

    return newBooks;
  }, [data, filter.sort]);

  /**
   * Filter by book title or author name
   */
  const filters = useMemo(() => {
    const books = sorts.filter((book) => {
      const isName = book.name
        .toLowerCase()
        .includes(filter.name.toLowerCase());
      const isAuthor = book.author
        .toLowerCase()
        .includes(filter.name.toLowerCase());

      return isName || isAuthor;
    });

    return books;
  }, [sorts, filter.name]);

  return { data: filters };
};
