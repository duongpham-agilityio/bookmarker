import { NotificationProps } from 'components';
import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultDispatch = (_props: NotificationProps) => {};

export const ToastContext = createContext<{
  setNotification: (_props: NotificationProps) => void;
}>({
  setNotification: defaultDispatch,
});
