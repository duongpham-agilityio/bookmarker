/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, createContext } from 'react';

// Types
import { Book } from 'types';

export type StateType =
  | {
      formData: Book;
      title: string;
    }
  | undefined;

type Props = StateType | ((_prev: StateType) => StateType);

const defaultDispatch: Dispatch<SetStateAction<StateType>> = (props: Props) =>
  props;

export const FormContext = createContext<{
  dispatch: Dispatch<SetStateAction<StateType>>;
  createBook: (_book: Omit<Book, 'id'>) => void;
  updateBook: (_id: number, _book: Omit<Book, 'id'>) => void;
}>({
  dispatch: defaultDispatch,
  createBook: (_book: Omit<Book, 'id'>) => {},
  updateBook: (_id: number, _book: Omit<Book, 'id'>) => {},
});
