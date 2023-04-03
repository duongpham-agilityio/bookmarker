import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import { Outlet } from 'react-router-dom';

// Layout
import Header from 'layouts/Header';

// Context
import { FormProvider, PopupProvider, ToastProvider } from 'contexts';

// Helpers
import { fetcher } from 'helpers';

const MainLayout = () => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <ToastProvider>
        <PopupProvider>
          <FormProvider>
            <Header />
            <Suspense>
              <Outlet />
            </Suspense>
          </FormProvider>
        </PopupProvider>
      </ToastProvider>
    </SWRConfig>
  );
};

export default MainLayout;
