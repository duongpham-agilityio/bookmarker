import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

// Helpers
import { convertTimeToDate } from 'helpers';

// Types
import { Book } from 'types';

export const useForm = (
  data: Omit<Book, 'deletedAt' | 'createdAt' | 'updatedAt'>,
  callback?: () => void
) => {
  const [state] = useState(data);
  const refImage = useRef<HTMLInputElement>(null);

  const value = useMemo(() => {
    const { publishDate, ...rest } = state;

    return {
      ...rest,
      publishDate: convertTimeToDate(publishDate),
    };
  }, [state]);

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (callback) {
        callback();
      }
    },
    [callback]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const element = event.target;
      const key: keyof typeof data = element.name as keyof typeof data;
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
