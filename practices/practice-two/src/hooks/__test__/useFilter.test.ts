import { renderHook } from '@testing-library/react';

// Hooks
import { Filter, useFilter } from 'hooks/useFilter';

// Mocks data
import { books } from 'mock-data';

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

describe('useFilter', () => {
  it('Run with default filter', () => {
    const {
      result: {
        current: { data },
      },
    } = renderHook(() => useFilter(books, defaultFilter));

    expect(data.length).toBe(books.length);
  });

  it('Run with custom filter', () => {
    const {
      result: {
        current: { data },
      },
      rerender,
    } = renderHook((option) => useFilter(books, option), {
      initialProps: defaultFilter,
    });

    expect(data.length).toBe(books.length);

    rerender({
      name: 'HTML',
      sort: '',
    });
    expect(data.length).toBe(11);

    rerender({
      name: '',
      sort: 'descending',
    });
    expect(data.length).toBe(11);

    rerender({
      name: '',
      sort: 'ascending',
    });
    expect(data.length).toBe(11);
  });
});
