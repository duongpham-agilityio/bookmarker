import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

// Types
import { Book } from 'types';

// Helpers
import { axiosConfig } from 'helpers';

// Constants
import { ENDPOINT } from '@constants';
import { usePopupContext } from './usePopupContext';

/**
 * Get the data of a book
 * @returns object containing properties and methods for interacting with a book
 */
export const useBook = () => {
  const { dispatch } = usePopupContext();
  const { id } = useParams();
  const { mutate, ...rest } = useSWR<Book>(`${ENDPOINT.BOOKS}/${id}`);

  const deleteBook = useCallback(() => {
    dispatch(() => {
      mutate(
        async () => {
          return await axiosConfig.delete(`${ENDPOINT.BOOKS}/${id}`);
        },
        {
          populateCache: false,
          revalidate: false,
        }
      );

      window.location.replace(`${ENDPOINT.BOOKS}`);
    });
  }, [dispatch, id, mutate]);

  return {
    ...{ ...rest, mutate },
    deleteBook,
  };
};
