import { renderHook } from '@testing-library/react';
import { useBook } from 'hooks/useBook';

jest.mock('swr', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: jest.fn((_endpoint: string) => ({
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
  })),
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
  it('render', () => {
    const { result } = renderHook(() => useBook());

    expect(result.current.data).toEqual(data);
  });
});
