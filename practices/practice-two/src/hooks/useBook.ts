import { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

// Contexts
import { PopupContext } from 'contexts/Popup/context';

// Mock data
import { book } from 'mock-data';

// Types
import { Book } from 'types';
import { axiosConfig } from 'helpers';

/**
 * Get the data of a book
 * @returns object containing properties and methods for interacting with a book
 */
export const useBook = () => {
  const { dispatch } = useContext(PopupContext);
  const { id } = useParams();
  const { data = book, mutate, ...rest } = useSWR<Book>(`books/${id}`);
  const deleteBook = useCallback(() => {
    dispatch(() => {
      mutate(
        async () => {
          return await axiosConfig.delete(`books/${id}`);
        },
        {
          populateCache: false,
          revalidate: false,
        }
      );

      window.location.replace('/books');
    });
  }, []);

  return {
    ...{ ...rest, data, mutate },
    deleteBook,
  };
};
