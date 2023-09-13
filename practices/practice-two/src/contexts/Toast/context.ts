import { createContext } from 'react';

// Types
import { NotificationProps } from 'components';

type IToastContext = { setNotification: (_props: NotificationProps) => void };

export const ToastContext = createContext<IToastContext | null>(null);
