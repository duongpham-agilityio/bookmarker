import { renderHook } from '@testing-library/react';
import { useDebounce } from 'hooks/useDebounce';

const setup = (callback?: (_value: string) => void) => {
  return renderHook(({ callback }) => useDebounce(callback), {
    initialProps: {
      callback,
    },
  });
};

jest.useFakeTimers();
describe('useDebounce', () => {
  it('should debounce user input', async () => {
    const callback = jest.fn();
    const { result } = setup(callback);

    result.current('hello');
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith('hello');
  });

  it('should debounce', async () => {
    const callback = jest.fn();
    const { result } = setup(callback);

    result.current('hello');
    result.current('hello');
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith('hello');
  });
});
