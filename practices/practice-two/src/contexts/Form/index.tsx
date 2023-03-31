import { ReactNode, useCallback, useState } from 'react';

// Components
import { Form } from 'components';

//Context
import { FormContext } from 'contexts/Form/context';

// Types
import { Book } from 'types';

type StateType =
  | {
      formData: Book;
      title: string;
    }
  | undefined;

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<StateType>(undefined);

  const createBook = useCallback((book: Omit<Book, 'id'>) => {
    console.log('Create Book', book);
  }, []);

  const updateBook = useCallback((id: number, book: Omit<Book, 'id'>) => {
    console.log('Create Book', id);
    console.log('Create Book', book);
  }, []);

  return (
    <FormContext.Provider
      value={{
        dispatch: setForm,
        createBook,
        updateBook,
      }}
    >
      {children}

      {form && <Form value={form.formData} title={form.title} />}
    </FormContext.Provider>
  );
};

export default FormProvider;
