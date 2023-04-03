import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

// Helpers
import {
  axiosConfig,
  convertStringToTime,
  convertTimeToDate,
  fetcher,
  validate,
} from 'helpers';

// Constants
import { MESSAGES } from '@constants';

// Contexts
import { ToastContext } from 'contexts/Toast/context';
import { FormContext } from 'contexts/Form/context';

// Types
import { Book } from 'types';
import { mutate } from 'swr';

export const useForm = (
  data: Omit<Book, 'publishDate' | 'deletedAt' | 'createdAt' | 'updatedAt'> & {
    publishDate?: number;
  },
  type: 'create' | 'update'
) => {
  const { setNotification } = useContext(ToastContext);
  const { dispatch } = useContext(FormContext);

  const [state, setState] = useState({
    ...data,
    imageName: '',
  });
  const refImage = useRef<HTMLInputElement>(null);

  const value = useMemo(() => {
    const { publishDate, ...rest } = state;

    return {
      ...rest,
      publishDate: publishDate ? convertTimeToDate(publishDate) : '',
    };
  }, [state]);

  const handleCreateBook = useCallback(() => {
    mutate(
      'books',
      async () => {
        // eslint-disable-next-line no-unused-vars
        const { imageName, ...rest } = state;
        await axiosConfig.post('/books', rest);

        return fetcher('books');
      },
      {
        optimisticData: (prevData: Book[]) => {
          setNotification({
            message: MESSAGES.ADD_SUCCESS,
            title: MESSAGES.ADD_TITLE,
          });
          dispatch(undefined);

          return [
            ...prevData,
            {
              ...state,
              id: 0,
            },
          ];
        },
        revalidate: true,
      }
    );
  }, [state]);

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const { name, author, imageURL, description, publishDate, ...rest } =
        state;
      const checked = {
        name,
        author,
        imageURL,
        description,
        publishDate,
      };

      const isError = validate(checked);

      if (isError) {
        return setNotification({
          message: MESSAGES.EMPTY_FIELD_DESCRIPTION,
          title: MESSAGES.EMPTY_FIELD,
          type: 'error',
        });
      }

      if (type === 'create') return handleCreateBook();
    },
    [type, state]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const element = event.target;
      const key: keyof typeof data = element.name as keyof typeof data;

      if (key === 'publishDate') {
        return setState((prev) => ({
          ...prev,
          publishDate: convertStringToTime(element.value),
        }));
      }

      if (key === 'imageURL') {
        const imageEl = element as HTMLInputElement;
        const files = imageEl.files;

        if (files) {
          const imageURL = URL.createObjectURL(files[0]);
          const name = files[0].name;

          return setState((prev) => ({
            ...prev,
            imageURL: imageURL,
            imageName: name,
          }));
        }

        return;
      }

      setState((prev) => ({
        ...prev,
        [key]: element.value,
      }));
    },
    []
  );

  return {
    value,
    refImage,
    onSubmit,
    onChange,
  };
};
