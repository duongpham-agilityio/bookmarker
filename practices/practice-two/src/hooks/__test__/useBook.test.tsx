//Mocks
import 'components/__test__/mocks/image.test';

import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Contexts
import { PopupProvider } from 'contexts';

// Hooks
import { useBook } from 'hooks/useBook';

jest.mock('hooks', () => ({
  usePopupContext: () => ({
    dispatch: jest.fn(),
  }),
}));

jest.mock('swr', () => ({
  default: () => ({
    data: {
      name: 'HTML/CSS Ebook 1',
      description: 'Description of some book will displayed here',
      author: 'Duong.Pham',
      imageURL:
        'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      createdAt: 1680158351376,
      deletedAt: null,
      updatedAt: 1680158351376,
      publishDate: 1680158351376,
      id: 1,
    },
    mutate: jest.fn(),
  }),
}));

const data = {
  name: 'HTML/CSS Ebook 1',
  description: 'Description of some book will displayed here',
  author: 'Duong.Pham',
  imageURL:
    'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  createdAt: 1680158351376,
  deletedAt: null,
  updatedAt: 1680158351376,
  publishDate: 1680158351376,
  id: 1,
};

describe('useBook', () => {
  it('Render', () => {
    const {
      result: {
        current: { data: res, deleteBook, mutate },
      },
    } = renderHook(useBook, {
      wrapper: PopupProvider,
    });

    expect(res).toEqual(data);

    act(() => {
      deleteBook();
    });

    const buttons = document.querySelectorAll('button');

    act(() => {
      buttons[1].click();
    });

    expect(mutate).toBeCalled();
  });
});
