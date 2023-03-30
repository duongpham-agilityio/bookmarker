import { useMemo, useRef } from 'react';

// Constants
import { TIMEOUT_DEBOUNCE } from '@constants';

/**
 * - This is a custom hook that listens for user input
 * @param callback Have a string as parameter
 * @returns
 */
export const useDebounce = (
  value: string,
  callback?: (_value: string) => void
) => {
  const refTime = useRef<ReturnType<typeof setTimeout>>();

  useMemo(() => {
    if (refTime.current) clearTimeout(refTime.current);

    refTime.current = setTimeout(() => {
      if (callback) callback(value);
    }, TIMEOUT_DEBOUNCE);
  }, [value]);
};
