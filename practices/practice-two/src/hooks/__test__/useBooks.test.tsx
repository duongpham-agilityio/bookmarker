import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, getByTestId, renderHook } from '@testing-library/react';

// Mocks
import 'components/__test__/mocks/image.test';

// Providers
import { PopupProvider, ToastProvider } from 'contexts';

// Hooks
import { useBooks } from 'hooks/useBooks';

// Constants
// import { MESSAGES } from '@constants';
// import { axiosConfig } from 'helpers';

jest.mock('helpers');

const fetcher = jest.fn().mockImplementation(() =>
  Promise.resolve([
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
  ])
);

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <BrowserRouter>
        <ToastProvider>
          <PopupProvider>{children}</PopupProvider>
        </ToastProvider>
      </BrowserRouter>
    </SWRConfig>
  );
};

describe('useBooks', () => {
  it('Render', async () => {
    const {
      result: {
        current: { deleteBook },
      },
    } = await act(() =>
      renderHook(useBooks, {
        wrapper: Wrapper,
      })
    );

    act(() => {
      deleteBook(0);
    });

    const buttons = document.querySelectorAll('button');

    act(() => {
      buttons[1].click();
    });

    const message = getByTestId(document.body, 'notify-message');

    expect(message.textContent).toBe('Delete success');
  });

  it('Render with reject data', () => {
    const {
      result: {
        current: { deleteBook },
      },
    } = renderHook(useBooks, {
      wrapper: Wrapper,
    });

    act(() => {
      deleteBook(2);
    });

    const buttons = document.querySelectorAll('button');

    act(() => {
      buttons[1].click();
    });

    // const message = getByTestId(document.body, 'notify-message');

    // // expect(message.textContent).toBe(MESSAGES.EMPTY_FIELD);
  });
});
