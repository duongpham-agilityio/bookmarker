import { FormEvent } from 'react';

// Mocks
import 'components/__test__/mocks/image.test';

import { act, renderHook } from '@testing-library/react';

// Providers
import { ToastProvider } from 'contexts';

// Hooks
import { FormData, useBookForm } from 'hooks/useBookForm';

jest.mock('helpers');

describe('useBookForm', () => {
  jest.useFakeTimers();
  it('Create data', () => {
    const {
      result: {
        current: { handleSelectRecommended, onSubmit },
      },
    } = renderHook(
      ({
        data,
        type,
        submitHandler,
      }: {
        data: FormData;
        type: 'create' | 'update';
        submitHandler: (data: FormData) => Promise<void>;
      }) => useBookForm(data, type, submitHandler),
      {
        initialProps: {
          data: {
            author: '',
            description: '',
            imageURL: '',
            name: '',
          },
          type: 'create',
          submitHandler: jest.fn().mockResolvedValue(
            new Promise((resolve) => {
              resolve('');
            })
          ),
        },
        wrapper: ToastProvider,
      }
    );

    act(() => {
      handleSelectRecommended(0);
      const form = document.createElement('form');

      form.addEventListener('submit', (e: SubmitEvent) => {
        onSubmit(e as unknown as FormEvent);
      });
      form.submit();
      jest.runAllTimers();
    });
  });

  it('Update data', () => {
    // jest
    //   .spyOn(helpers.axiosConfig, 'get')
    //   .mockImplementation(jest.fn().mockResolvedValue([]));
    const {
      result: {
        current: { onSubmit },
      },
    } = renderHook(
      ({
        data,
        type,
        submitHandler,
      }: {
        data: FormData;
        type: 'create' | 'update';
        submitHandler: (data: FormData) => Promise<void>;
      }) => useBookForm(data, type, submitHandler),
      {
        initialProps: {
          data: {
            author: 'Duong Pham',
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, dicta.',
            imageURL:
              'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            name: 'Lorem ipsum dolor',
            publishDate: 1693872000000,
          },
          type: 'create',
          submitHandler: jest.fn().mockResolvedValue(
            new Promise((resolve) => {
              resolve('');
            })
          ),
        },
        wrapper: ToastProvider,
      }
    );

    act(() => {
      const form = document.createElement('form');

      form.addEventListener('submit', (e: SubmitEvent) => {
        onSubmit(e as unknown as FormEvent);
      });
      form.submit();
    });
  });
});
