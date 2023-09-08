/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, createContext } from 'react';

// Types
import { Book } from 'types';

export type StateType =
  | {
      formData: Omit<Book, 'publishDate'> & {
        publishDate?: number;
      };
      title: string;
      type: 'update' | 'create';
    }
  | undefined;

type Props = StateType | ((_prev: StateType) => StateType);

const defaultDispatch: Dispatch<SetStateAction<StateType>> = (props: Props) =>
  props;

export const FormContext = createContext<{
  dispatch: Dispatch<SetStateAction<StateType>>;
}>({
  dispatch: defaultDispatch,
});
