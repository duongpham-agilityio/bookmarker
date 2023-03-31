import { useCallback, useContext } from 'react';
import useSWR from 'swr';
import { useFilter, usePagination, useSearchParam } from 'hooks';

// Context
import { PopupContext } from 'contexts/Popup/context';
import { ToastContext } from 'contexts/Toast/context';

// Helpers
import { axiosConfig } from 'helpers';

// Types
import { Book } from 'types';

export const useBooks = () => {
  const { dispatch } = useContext(PopupContext);
  const { setNotification } = useContext(ToastContext);
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

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(() => {
        const newData = swr.data?.filter((book) => {
          return book.id !== id;
        });

        swr.mutate(() => axiosConfig.delete(`books/${id}`), {
          optimisticData: newData,
          populateCache: false,
          revalidate: false,
        });

        setNotification({ message: 'Delete success', title: 'Delete ' });
      });
    },
    [swr.data]
  );

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
