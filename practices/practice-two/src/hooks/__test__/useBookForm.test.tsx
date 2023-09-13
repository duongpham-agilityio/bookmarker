import { ChangeEvent, FormEvent } from 'react';

// Mocks
import 'components/__test__/mocks/image.test';

import { act, fireEvent, renderHook } from '@testing-library/react';

// Providers
import { ToastProvider } from 'contexts';

// Hooks
import { FormData, useBookForm } from 'hooks/useBookForm';

// Helpers
import * as helpers from 'helpers';

jest.mock('helpers', () => ({
  ...jest.requireActual('helpers'),
}));

jest.mock('services', () => jest.requireActual('services'));

const submitHandler = jest.fn();
const initial: {
  data: FormData;
  type: 'create' | 'update';
  submitHandler: () => Promise<void>;
} = {
  data: {
    author: '',
    description: '',
    imageURL: '',
    name: '',
    publishDate: 0,
  },
  type: 'create',
  submitHandler: submitHandler.mockResolvedValue(
    new Promise((resolve) => {
      resolve('');
    })
  ),
};

const setup = (
  props?: Partial<{
    data: FormData;
    type: 'create' | 'update';
    submitHandler: () => Promise<void>;
  }>
) =>
  renderHook(
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
        ...initial,
        ...props,
      },
      wrapper: ToastProvider,
    }
  );

describe('useBookForm', () => {
  jest.useFakeTimers();
  it('Create data', async () => {
    const {
      result: {
        current: { handleSelectRecommended, onSubmit },
      },
    } = setup();

    await act(() => {
      handleSelectRecommended(0);
      const form = document.createElement('form');

      form.addEventListener('submit', (e: SubmitEvent) => {
        act(() => onSubmit(e as unknown as FormEvent));
      });
      form.submit();
    });

    expect(submitHandler).not.toBeCalled();
  });

  it('Update data', async () => {
    const {
      result: {
        current: { onSubmit },
      },
    } = setup({
      data: {
        author: 'duong',
        description: 'lorme  duong',
        imageURL: 'image',
        name: 'Duong Pham',
        publishDate: new Date().getTime(),
      },
    });

    await act(() => {
      const form = document.createElement('form');

      form.addEventListener('submit', (e: SubmitEvent) => {
        act(() => onSubmit(e as unknown as FormEvent));
      });
      form.submit();
    });

    expect(submitHandler).toBeCalled();

    expect(submitHandler).toBeCalled();
  });

  it('Change image with resolve case', () => {
    jest.spyOn(helpers.axiosConfig, 'post').mockResolvedValue({
      data: {
        status: 200,
        data: {
          url: 'localhost',
        },
      },
    });

    const {
      result: {
        current: { onChange },
      },
    } = setup();

    const imageURL = document.createElement('input');

    imageURL.name = 'imageURL';
    imageURL.addEventListener('change', async (e: Event) => {
      await onChange(e as unknown as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      fireEvent.change(imageURL, {
        target: {
          files: [{ name: 'html' }],
        },
      });
    });

    expect((imageURL.files as FileList)[0].name).toBeTruthy();
  });

  it('Change image with reject case', () => {
    jest.spyOn(helpers.axiosConfig, 'post').mockRejectedValue({
      data: {},
    });

    const {
      result: {
        current: { onChange },
      },
    } = setup();

    const imageURL = document.createElement('input');

    imageURL.name = 'imageURL';
    imageURL.addEventListener('change', async (e: Event) => {
      await onChange(e as unknown as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      fireEvent.change(imageURL, {
        target: {
          files: [{ name: 'html' }],
        },
      });
    });

    expect((imageURL.files as FileList)[0].name).toBeTruthy();
  });

  it('Change value', () => {
    const {
      result: {
        current: { onChange },
      },
    } = setup();

    const createInput = (name: string) => {
      const input = document.createElement('input');

      input.name = name;
      input.addEventListener('change', async (e: Event) => {
        await onChange(e as unknown as ChangeEvent<HTMLInputElement>);
      });

      return input;
    };

    const publishDate = createInput('publishDate');
    const name = createInput('name');
    const imageURL = createInput('imageURL');

    act(() => {
      fireEvent.change(publishDate, {
        target: {
          value: '2023-09-14',
        },
      });
      fireEvent.change(name, {
        target: {
          value: 'Duong Pham',
        },
      });
      fireEvent.change(imageURL, {
        target: {},
      });
    });

    expect(publishDate.value).toBeTruthy();
    expect(name.value).toBeTruthy();
    expect(imageURL.files).toBeFalsy();
  });
});
