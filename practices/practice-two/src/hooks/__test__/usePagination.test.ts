import { renderHook } from '@testing-library/react';
import { usePagination } from 'hooks/usePagination';

// Types
import { Book } from 'types';

jest.mock('hooks', () => ({
  useSearchParam: jest.fn().mockReturnValue({
    param: {
      page: 1,
    },
  }),
}));

const setup = (data: Book[]) =>
  renderHook((value) => usePagination(value, 1), {
    initialProps: data,
  });

const products: Book[] = [
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
  {
    name: 'HTML/CSS Ebook 2',
    description: 'Description of some book will displayed here',
    author: 'Duong.Pham',
    imageURL:
      'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    createdAt: 1680158351376,
    deletedAt: null,
    updatedAt: 1680158351376,
    publishDate: 1680158351376,
    id: 2,
  },
];

describe('usePagination', () => {
  it('render with empty data', () => {
    const { result } = setup([]);

    expect(result.current.data.length).toBe(0);
  });

  it('render with data', () => {
    const { result } = setup(products);

    expect(result.current.data.length).toBe(products.length);
  });

  it('rerender with new data', () => {
    const { result, rerender } = setup(products);

    expect(result.current.data.length).toBe(products.length);

    rerender([]);
    expect(result.current.data.length).toBe(0);
  });
});
