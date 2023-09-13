import { useCallback } from 'react';
import useSWR from 'swr';
import {
  useFilter,
  usePagination,
  usePopupContext,
  useSearchParam,
  useToastContext,
} from 'hooks';

// Helpers
import { axiosConfig } from 'helpers';

// Types
import { Book } from 'types';

// Constants
import { ENDPOINT, MESSAGES } from '@constants';

/**
 * Get out all the current list
 * @returns object containing properties and methods for interacting with a books
 */
export const useBooks = () => {
  const { dispatch } = usePopupContext();
  const { setNotification } = useToastContext();
  const swr = useSWR<Book[]>(`${ENDPOINT.BOOKS}${ENDPOINT.SORT}`);
  const {
    param: { name, sort, page },
    ...restUseSearch
  } = useSearchParam();
  const { data: filters } = useFilter(swr.data || [], {
    name,
    sort,
  });
  const pagination = usePagination(filters, page);
  const handleDelete = useCallback(
    (id: number) => {
      try {
        dispatch(() => {
          const newData = swr.data?.filter((book) => {
            return book.id !== id;
          });

          swr.mutate(() => axiosConfig.delete(`${ENDPOINT.BOOKS}/${id}`), {
            optimisticData: newData,
            populateCache: false,
            revalidate: false,
          });

          setNotification({ message: 'Delete success', title: 'Delete ' });
        });
      } catch (error) {
        return setNotification({
          message: MESSAGES.ERROR_TITLE,
          title: MESSAGES.EMPTY_FIELD,
          type: 'error',
        });
      }
    },
    [dispatch, setNotification, swr]
  );

  return {
    ...swr,
    ...restUseSearch,
    ...pagination,
    param: { name, sort, page },
    deleteBook: handleDelete,
  };
};
