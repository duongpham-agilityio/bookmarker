import { renderHook } from '@testing-library/react';
import { useDebounce } from 'hooks/useDebounce';

const setup = (value: string, callback?: (_value: string) => void) => {
  return renderHook(({ value, callback }) => useDebounce(value, callback), {
    initialProps: {
      value,
      callback,
    },
  });
};

jest.useFakeTimers();
describe('useDebounce', () => {
  it('should debounce user input', async () => {
    const callback = jest.fn();
    const { rerender } = setup('', callback);

    rerender({ value: 'hello', callback });
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith('hello');
  });
});
