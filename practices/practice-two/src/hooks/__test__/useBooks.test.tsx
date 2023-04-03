import { ReactNode } from 'react';
import { act, fireEvent, renderHook, screen } from '@testing-library/react';

// Hooks
import { useBooks } from 'hooks/useBooks';
import * as hooks from 'hooks';

// Context
import { PopupProvider, ToastProvider } from 'contexts';

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <PopupProvider>{children}</PopupProvider>
    </ToastProvider>
  );
};

const setup = () =>
  renderHook(() => useBooks(), {
    wrapper,
  });

jest.mock('assets/icons/x-letter.svg', () => ({
  default: 'assets/icons/x-letter.svg',
}));

jest.mock('assets/icons/upload.svg', () => ({
  default: 'assets/icons/upload.svg',
}));

jest.mock('assets/icons/next.svg', () => ({
  default: 'assets/icons/next.svg',
}));

jest.mock('assets/icons/trash.svg', () => ({
  default: 'assets/icons/trash.svg',
}));

jest.mock('assets/icons/back.svg', () => ({
  default: 'assets/icons/back.svg',
}));

jest.mock('assets/icons/pencil.svg', () => ({
  default: 'assets/icons/pencil.svg',
}));

const data = [
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
];

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
  useFilter: jest.fn().mockReturnValue({
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
  usePagination: jest.fn().mockReturnValue({
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

jest.mock('swr', () => ({
  default: jest.fn((_endpoint: string) => ({
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
  })),
}));

describe('useBooks', () => {
  const mockChangePage = jest.fn();
  beforeEach(() => {
    jest.spyOn(hooks, 'useSearchParam').mockReturnValue({
      param: {
        page: 1,
        name: '',
        sort: '',
      },
      setSearchParam: jest.fn(),
    });

    jest.spyOn(hooks, 'usePagination').mockReturnValue({
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
      changePageByValue: mockChangePage,
      pagination: [],
    });
  });

  it('render', () => {
    const { result } = setup();

    expect(result.current.data).toEqual(data);
  });

  it('Action popup', () => {
    const { result } = setup();

    act(() => {
      result.current.deleteBook(1);
    });

    const mockOnCancel = jest.fn();
    const mockOnAccept = jest.fn();
    const buttons = screen.getAllByRole('button');

    buttons[0].addEventListener('click', mockOnCancel);
    buttons[1].addEventListener('click', mockOnAccept);

    act(() => {
      fireEvent.click(buttons[0]);
    });
    expect(mockOnCancel).toHaveBeenCalled();

    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(mockOnAccept).toHaveBeenCalled();
  });

  it('Action change param', () => {
    const { result } = setup();

    act(() => {
      result.current.changePageByValue(2);
    });

    expect(mockChangePage).toHaveBeenCalled();
  });
});
