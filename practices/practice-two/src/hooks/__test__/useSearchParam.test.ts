import { act, renderHook } from '@testing-library/react';
import { useSearchParam } from 'hooks';
import { useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom');

const mockUseSearchParams = jest.mocked(useSearchParams);
const mockSetSearchParams = jest.fn();
mockUseSearchParams.mockReturnValue([
  new URLSearchParams(''),
  mockSetSearchParams,
]);

const setup = () => {
  return renderHook(() => useSearchParam());
};

describe('useSearchParam', () => {
  it('Run with search params default', () => {
    const {
      result: {
        current: { param },
      },
    } = setup();

    expect(param).toEqual({
      page: 1,
      name: '',
      sort: '',
    });
  });

  it('Run with setSearchParam', () => {
    const {
      result: {
        current: { param, setSearchParam },
      },
    } = setup();

    expect(param).toEqual({
      page: 1,
      name: '',
      sort: '',
    });

    act(() => {
      setSearchParam('name', 'salt');
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('Run convertSearchParamsToString', () => {
    const {
      result: {
        current: { convertSearchParamsToString },
      },
    } = setup();

    const result = convertSearchParamsToString('name', 'duong');

    console.log(result);
  });
});
