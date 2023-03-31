import {
  ChangeEvent,
  FormEvent,
  useCallback,
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
} from 'helpers';

// Types
import { Book } from 'types';
import { mutate } from 'swr';

export const useForm = (
  data: Omit<Book, 'publishDate' | 'deletedAt' | 'createdAt' | 'updatedAt'> & {
    publishDate?: number;
  },
  type: 'create' | 'update'
) => {
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

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      mutate(
        'books',
        async () => {
          await axiosConfig.post('/books', state);

          return fetcher('books');
        },
        {
          optimisticData: (prevData: Book[]) => {
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
