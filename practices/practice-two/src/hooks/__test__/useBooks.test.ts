import { act, renderHook } from '@testing-library/react';
import { useBooks } from 'hooks/useBooks';

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
  useSearchParam: jest.fn().mockReturnValue({
    param: {
      page: 1,
    },
  }),
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

const setup = () => renderHook(() => useBooks());

describe('useBooks', () => {
  it('render', () => {
    const { result } = setup();

    expect(result.current.data).toEqual(data);
  });

  it('action', () => {
    const { result } = setup();
    const mockHandleDelete = jest.fn();

    result.current.deleteBook = mockHandleDelete;

    act(() => {
      result.current.deleteBook(1);
    });

    expect(mockHandleDelete).toHaveBeenCalled();
  });
});
