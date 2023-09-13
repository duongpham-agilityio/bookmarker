/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

// Hook
import { useToastContext } from 'hooks';

// Helpers
import {
  axiosConfig,
  convertStringToTime,
  convertTimeToDate,
  validate,
} from 'helpers';

// Services
import { uploadImage } from 'services';

// Constants
import { MESSAGES, TIMEOUT_DEBOUNCE } from '@constants';

// Mock data
import { book } from 'mock-data';

// Types
import { Book, Recommend } from 'types';

export type FormData = Omit<
  Book,
  'publishDate' | 'deletedAt' | 'createdAt' | 'updatedAt'
> & {
  publishDate?: number;
};

/**
 * Interacting with forms
 * @param data initialization values ​of data fields in form
 * @param type To know if this is a create form or an update form
 * @returns Object
 */
export const useBookForm = (
  data: FormData,
  type: 'create' | 'update',
  submitHandler: (data: FormData) => Promise<void>
) => {
  const { setNotification } = useToastContext();
  const [state, setState] = useState<FormData & { imageName: string }>({
    ...data,
    imageName: '',
  });
  const [isUpload, setIsUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [booksRecommended, setBooksRecommended] = useState<Recommend[]>([]);
  const refImage = useRef<HTMLInputElement>(null);
  const refTime = useRef<ReturnType<typeof setTimeout>>();
  /**
   * Convert data to render form
   */
  const value = useMemo(() => {
    const { publishDate, ...rest } = state;

    return {
      ...rest,
      publishDate: publishDate ? convertTimeToDate(publishDate) : '',
    };
  }, [state]);

  /**
   * Handling get recommend
   */
  const handleRecommended = useCallback((value: string) => {
    if (value) {
      if (refTime.current) clearTimeout(refTime.current);

      refTime.current = setTimeout(async () => {
        try {
          const books = await axiosConfig
            .get(`${process.env.VITE_RECOMMENDED_URL}?q=${value}`)
            .then((r) => r.data)
            .then((data) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const books =
                data?.items.map((_item: { volumeInfo: any }) => {
                  const { title, publishedDate, description, imageLinks } =
                    _item.volumeInfo;

                  return {
                    name: title,
                    publishDate: publishedDate,
                    description,
                    imageURL: imageLinks.thumbnail || book.imageURL,
                  };
                }) || [];

              return books;
            });

          setBooksRecommended(books);
        } catch (error) {
          setBooksRecommended([]);
        }
      }, TIMEOUT_DEBOUNCE);
    }
  }, []);

  /**
   * Handling select an recommend
   */
  const handleSelectRecommended = useCallback(
    (index: number) => {
      const book = booksRecommended[index];

      setState((prev) => ({
        ...prev,
        ...book,
      }));
      setBooksRecommended([]);
    },
    [booksRecommended]
  );

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const { name, author, imageURL, description, publishDate } = state;
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

      setIsSubmit(true);
      submitHandler(state).finally(() => setIsSubmit(false));
    },
    [setNotification, state, submitHandler]
  );

  const onChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const element = event.target;
      const value = element.value;
      const key: keyof typeof data = element.name as keyof typeof data;

      if (key === 'publishDate') {
        return setState((prev) => ({
          ...prev,
          publishDate: convertStringToTime(value.trim()),
        }));
      }

      if (key === 'imageURL') {
        const imageEl = element as HTMLInputElement;
        const files = imageEl.files;

        if (files) {
          const data = new FormData();
          const file = files[0];

          data.append('image', file);
          setIsUpload(true);
          uploadImage(data, (response) => {
            if (response.status) {
              const name = file.name;

              setIsUpload(false);
              setState((prev) => ({
                ...prev,
                imageURL: response.data.url,
                imageName: name,
              }));

              return;
            }

            return setNotification({
              message: MESSAGES.ERROR_TITLE,
              title: MESSAGES.EMPTY_FIELD,
              type: 'error',
            });
          });

          return;
        }

        return;
      }

      if (key === 'name') handleRecommended(value.trim());

      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [handleRecommended, setNotification]
  );

  return {
    value,
    isUpload,
    booksRecommended,
    refImage,
    isSubmit,
    handleSelectRecommended,
    resetRecommended: setBooksRecommended,
    onSubmit,
    onChange,
  };
};
