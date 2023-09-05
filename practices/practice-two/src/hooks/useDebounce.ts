import { useMemo, useRef } from 'react';

// Constants
import { TIMEOUT_DEBOUNCE } from '@constants';

/**
 * - This is a custom hook that listens for user input
 * @param callback Have a string as parameter
 * @returns
 */
export const useDebounce = (callback?: (_value: string) => void) => {
  const refTime = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useMemo(() => {
    return (value: string) => {
      if (refTime.current) clearTimeout(refTime.current);

      refTime.current = setTimeout(() => {
        if (callback) callback(value.trim());
      }, TIMEOUT_DEBOUNCE);
    };
  }, [callback]);

  return debounce;
};
