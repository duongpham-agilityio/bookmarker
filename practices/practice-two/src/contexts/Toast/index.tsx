import { ReactNode, useCallback, useState } from 'react';

// Components
import { NotificationProps, Notification } from 'components';

// Context
import { ToastContext } from 'contexts/Toast/context';

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<
    NotificationProps | undefined
  >();

  const handleSetNotification = useCallback((props: NotificationProps) => {
    setNotification(props);

    setTimeout(() => {
      setNotification(undefined);
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ setNotification: handleSetNotification }}>
      {children}

      {notification && <Notification {...notification} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
