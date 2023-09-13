// Mocks
import 'components/__test__/mocks/image.test';

import { renderHook } from '@testing-library/react';

// Providers
import { ToastProvider } from 'contexts';

// Hooks
import { useToastContext } from 'hooks/useToastContext';

// Constants
import { MESSAGES } from '@constants';

describe('usePopupContext', () => {
  it('Have data', () => {
    const { result } = renderHook(useToastContext, {
      wrapper: ToastProvider,
    });

    expect(result.current).not.toBeUndefined();
  });

  it('Not have data', () => {
    try {
      renderHook(useToastContext);
    } catch (error) {
      expect(error).toBe(MESSAGES.CONTEXT_ERROR);
    }
  });
});
