import { SORT } from '@constants';
import { useMemo } from 'react';
import { Book } from 'types';

export type Filter = {
  name: string;
  sort: string;
};

export const useFilter = (data: Book[], filter: Filter) => {
  const filters = useMemo(() => {
    const books = data.filter((book) => {
      const isName = book.name
        .toLowerCase()
        .includes(filter.name.toLowerCase());
      const isAuthor = book.author
        .toLowerCase()
        .includes(filter.name.toLowerCase());

      return isName || isAuthor;
    });

    return books;
  }, [data, filter.name]);

  const books = useMemo(() => {
    if (!filter.sort) return filters;

    if (filter.sort === SORT.ASCENDING) {
      filters.sort(function (a, b) {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
      });

      return filters;
    }

    filters.sort(function (a, b) {
      if (a.name < b.name) return 1;

      if (a.name > b.name) return -1;

      return 0;
    });

    return filters;
  }, [filters, filter.sort]);

  return { data: books };
};
