import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, renderHook } from '@testing-library/react';

// Mocks
import 'components/__test__/mocks/image.test';

// Providers
import { PopupProvider, ToastProvider } from 'contexts';

// Hooks
import { useBooks } from 'hooks/useBooks';

jest.mock('swr', () => ({
  default: () => ({
    ...jest.requireActual('swr'),
    data: [
      {
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
    ],
  }),
}));

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <PopupProvider>{children}</PopupProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('useBooks', () => {
  it('Render', () => {
    const {
      result: {
        current: { deleteBook },
      },
    } = renderHook(useBooks, {
      wrapper: Wrapper,
    });

    act(() => {
      deleteBook(0);
    });

    const buttons = document.querySelectorAll('button');
    buttons[1].click();
  });
});
