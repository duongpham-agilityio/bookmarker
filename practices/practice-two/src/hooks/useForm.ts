/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Services
import { uploadImage } from 'services';

// Constants
import { MESSAGES, TIMEOUT_DEBOUNCE } from '@constants';

// Contexts
import { ToastContext } from 'contexts/Toast/context';
import { FormContext } from 'contexts/Form/context';

// Types
import { Book, Recommend } from 'types';
import { mutate } from 'swr';

// Mock data
import { book } from 'mock-data';

/**
 * Interacting with forms
 * @param data initialization values ​of data fields in form
 * @param type To know if this is a create form or an update form
 * @returns Object
 */
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

  const [isUpload, setIsUpload] = useState(false);

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
   * Handling add new book
   */
  const handleCreateBook = useCallback(() => {
    try {
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
    } catch (error) {
      setNotification({
        message: MESSAGES.ERROR_TITLE,
        title: MESSAGES.EMPTY_FIELD,
        type: 'error',
      });
    }
  }, [state]);

  /**
   * Handling update book
   */
  const handleUpdateBook = useCallback(() => {
    try {
      const newBook = {
        ...state,
        updatedAt: new Date().getTime(),
      };

      mutate(
        `books/${state.id}`,
        async () => {
          const res = await axiosConfig
            .patch(`books/${state.id}`, newBook)
            .then((r) => r.data);

          return res;
        },
        {
          optimisticData: newBook,
        }
      );
      setNotification({
        message: MESSAGES.UPDATE_TITLE,
        title: MESSAGES.UPDATE_SUCCESS,
      });
      dispatch(undefined);
    } catch (error) {
      setNotification({
        message: MESSAGES.ERROR_TITLE,
        title: MESSAGES.EMPTY_FIELD,
        type: 'error',
      });
    }
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
          setNotification({
            message: MESSAGES.ERROR_TITLE,
            title: MESSAGES.EMPTY_FIELD,
            type: 'error',
          });
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

      return handleUpdateBook();
    },
    [type, state]
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
    [state]
  );

  return {
    value,
    isUpload,
    booksRecommended,
    refImage,
    handleSelectRecommended,
    resetRecommended: setBooksRecommended,
    onSubmit,
    onChange,
  };
};
