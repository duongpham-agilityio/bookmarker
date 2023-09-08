import { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

// Contexts
import { PopupContext } from 'contexts/Popup/context';

// Mock data
import { book } from 'mock-data';

// Types
import { Book } from 'types';

// Helpers
import { axiosConfig } from 'helpers';

// Constants
import { ENDPOINT } from '@constants';

/**
 * Get the data of a book
 * @returns object containing properties and methods for interacting with a book
 */
export const useBook = () => {
  const { dispatch } = useContext(PopupContext);
  const { id } = useParams();
  const {
    data = book,
    mutate,
    ...rest
  } = useSWR<Book>(`${ENDPOINT.BOOKS}/${id}`);

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
  }, []);

  return {
    ...{ ...rest, data, mutate },
    deleteBook,
  };
};
