import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import { Outlet } from 'react-router-dom';

// Layout
import Header from 'layouts/Header';

// Context
import { PopupProvider, ToastProvider } from 'contexts';

// Helpers
import { fetcher } from 'helpers';

const MainLayout = () => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <ToastProvider>
        <PopupProvider>
          <Header />
          <Suspense>
            <Outlet />
          </Suspense>
        </PopupProvider>
      </ToastProvider>
    </SWRConfig>
  );
};

export default MainLayout;
