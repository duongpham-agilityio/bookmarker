import { useContext } from 'react';

// Constants
import { MESSAGES } from '@constants';

// Contexts
import { ToastContext } from 'contexts/Toast/context';

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) throw MESSAGES.CONTEXT_ERROR;

  return context;
};
