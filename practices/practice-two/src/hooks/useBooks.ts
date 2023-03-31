import { useCallback } from 'react';
import useSWR from 'swr';
import { useFilter, usePagination, useSearchParam } from 'hooks';

// Types
import { Book } from 'types';

export const useBooks = () => {
  const swr = useSWR<Book[]>('books');
  const {
    param: { name, sort, page },
    ...restUseSearch
  } = useSearchParam();
  const { data: filters } = useFilter(swr.data || [], {
    name,
    sort,
  });
  const pagination = usePagination(filters);

  const handleDelete = useCallback((callback: () => void) => {
    callback();
  }, []);

  const handleAdd = useCallback((book: Omit<Book, 'id'>) => {
    console.log('add product ', book);
  }, []);

  const handleUpdate = useCallback((id: number, book: Book) => {
    console.log('update book ', book);
  }, []);

  return {
    ...swr,
    ...restUseSearch,
    ...pagination,
    param: { name, sort, page },
    deleteBook: handleDelete,
    add: handleAdd,
    update: handleUpdate,
  };
};
