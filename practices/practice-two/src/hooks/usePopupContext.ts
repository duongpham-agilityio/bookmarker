import { useContext } from 'react';

// Constants
import { MESSAGES } from '@constants';

// Contexts
import { PopupContext } from 'contexts/Popup/context';

export const usePopupContext = () => {
  const context = useContext(PopupContext);

  if (!context) throw MESSAGES.CONTEXT_ERROR;

  return context;
};
