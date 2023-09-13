// Mocks
import 'components/__test__/mocks/image.test';

import { renderHook } from '@testing-library/react';

// Providers
import { PopupProvider } from 'contexts';

// Hooks
import { usePopupContext } from 'hooks/usePopupContext';

// Constants
import { MESSAGES } from '@constants';

describe('usePopupContext', () => {
  it('Have data', () => {
    const { result } = renderHook(usePopupContext, {
      wrapper: PopupProvider,
    });

    expect(result.current).not.toBeUndefined();
  });

  it('Not have data', () => {
    try {
      renderHook(usePopupContext);
    } catch (error) {
      expect(error).toBe(MESSAGES.CONTEXT_ERROR);
    }
  });
});
