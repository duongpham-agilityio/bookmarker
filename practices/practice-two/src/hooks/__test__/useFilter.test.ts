import { renderHook } from '@testing-library/react';
import { Filter, useFilter } from 'hooks/useFilter';

// Types
import { Book } from 'types';

jest.mock('hooks', () => ({
  useSearchParam: jest.fn().mockReturnValue({
    param: {
      name: '',
    },
  }),
}));

const defaultFilter: Filter = {
  name: '',
  sort: '',
};

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

describe('useFilter', () => {
  it('Run with default filter', () => {
    const { result } = renderHook(() => useFilter(products, defaultFilter));

    expect(result.current.data.length).toBe(2);
  });

  it('Run with custom filter', () => {
    const { result, rerender } = renderHook(
      (option) => useFilter(products, option),
      {
        initialProps: defaultFilter,
      }
    );

    expect(result.current.data.length).toBe(2);

    // Filter with name
    const filterWithBrand: Filter = {
      name: 'HTML',
      sort: '',
    };

    rerender(filterWithBrand);
    expect(result.current.data.length).toBe(2);

    // Sorts Z-A
    const filterWithSort: Filter = {
      name: '',
      sort: 'descending',
    };

    rerender(filterWithSort);
    expect(result.current.data.length).toBe(2);
  });
});
