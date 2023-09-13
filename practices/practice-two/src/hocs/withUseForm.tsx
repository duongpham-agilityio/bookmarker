import { FC, Suspense, lazy, useCallback, useMemo, useState } from 'react';
import useMutation from 'swr/mutation';

// Hooks
import { FormData, useToastContext } from 'hooks';

// Components
const Form = lazy(() => import('components/Form'));

// Constants
import { ENDPOINT, MESSAGES } from '@constants';

// Helpers
import { axiosConfig } from 'helpers';

// Types
import { Book } from 'types';

type FormStatus = 'update' | 'create';
interface StateType {
  formData: Omit<Book, 'publishDate'> & {
    publishDate?: number;
  };
  title: string;
  type: FormStatus;
}

export interface WithUseFormProps {
  dispatchAction: (data: StateType) => void;
}

export const withUseForm = <T extends WithUseFormProps>(Component: FC<T>) => {
  const FormHOC = (props: Omit<T, keyof WithUseFormProps>) => {
    const { setNotification } = useToastContext();
    const [form, setForm] = useState<StateType | null>(null);
    const [formStatus, setFormStatus] = useState<FormStatus>('create');
    const { trigger: triggerAddBook } = useMutation(
      `${ENDPOINT.BOOKS}${ENDPOINT.SORT}`,
      (_, { arg }: { arg: Omit<FormData, 'imageName'> }) =>
        axiosConfig.post(ENDPOINT.BOOKS, arg)
    );
    const { trigger: triggerUpdateBook } = useMutation(
      `${ENDPOINT.BOOKS}/${form?.formData.id}`,
      (key: string, { arg }: { arg: FormData & { updatedAt: number } }) =>
        axiosConfig.patch(key, arg)
    );

    const handleCloseForm = useCallback(() => setForm(null), []);

    const dispatchAction = useCallback((data: StateType) => {
      setForm(data);
      setFormStatus(data.type);
    }, []);

    const onTriggerCreate = useCallback(
      (result: FormData) =>
        triggerAddBook(result)
          .then(() =>
            setNotification({
              message: MESSAGES.ADD_SUCCESS,
              title: MESSAGES.ADD_TITLE,
            })
          )
          .catch(() =>
            setNotification({
              message: MESSAGES.ERROR_TITLE,
              title: MESSAGES.EMPTY_FIELD,
              type: 'error',
            })
          )
          .finally(handleCloseForm),
      [handleCloseForm, setNotification, triggerAddBook]
    );

    const onTriggerUpdate = useCallback(
      (result: FormData) => {
        const { author, description, imageURL, name, publishDate } = result;
        const payload: FormData & { updatedAt: number } = {
          author,
          description,
          imageURL,
          name,
          updatedAt: new Date().getTime(),
          publishDate,
        };

        return triggerUpdateBook(payload)
          .then(() =>
            setNotification({
              message: MESSAGES.UPDATE_TITLE,
              title: MESSAGES.UPDATE_SUCCESS,
            })
          )
          .catch(() =>
            setNotification({
              message: MESSAGES.ERROR_TITLE,
              title: MESSAGES.EMPTY_FIELD,
              type: 'error',
            })
          )
          .finally(handleCloseForm);
      },
      [handleCloseForm, setNotification, triggerUpdateBook]
    );

    const onSubmit = useMemo(() => {
      const handler = {
        create: onTriggerCreate,
        update: onTriggerUpdate,
      };

      return handler[formStatus];
    }, [formStatus, onTriggerCreate, onTriggerUpdate]);

    return (
      <>
        <Component {...(props as T)} {...{ dispatchAction }} />
        {form && (
          <Suspense>
            <Form
              value={form.formData}
              title={form.title}
              type={form.type}
              onClose={handleCloseForm}
              onSubmit={onSubmit}
            />
          </Suspense>
        )}
      </>
    );
  };

  return FormHOC;
};
