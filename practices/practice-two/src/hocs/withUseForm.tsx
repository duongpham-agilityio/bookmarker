import { FC, Suspense, lazy, useCallback, useState } from 'react';

// Components
const Form = lazy(() => import('components/Form'));

// Types
import { Book } from 'types';

export interface WithUseFormProps {
  openForm: (data: StateType) => void;
}

interface StateType {
  formData: Omit<Book, 'publishDate'> & {
    publishDate?: number;
  };
  title: string;
  type: 'update' | 'create';
}

export const withUseForm = <T extends WithUseFormProps>(Component: FC<T>) => {
  const FormHOC = (props: Omit<T, keyof WithUseFormProps>) => {
    const [form, setForm] = useState<StateType | null>(null);

    const openForm = useCallback((data: StateType) => setForm(data), []);

    const closeForm = useCallback(() => {
      setForm(null);
    }, []);

    return (
      <>
        <Component {...(props as T)} openForm={openForm} />
        <Suspense>
          {form && (
            <Form
              value={form.formData}
              title={form.title}
              type={form.type}
              onClose={closeForm}
            />
          )}
        </Suspense>
      </>
    );
  };

  return FormHOC;
};
