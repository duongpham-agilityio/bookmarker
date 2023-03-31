import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

// Context
import { ToastProvider } from 'contexts';

// Routes
import { routes } from 'routes';

// Helpers
import { fetcher } from 'helpers';

// Styles
import 'styles/index.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <ToastProvider>
        <RouterProvider router={routes} />
      </ToastProvider>
    </SWRConfig>
  </React.StrictMode>
);
