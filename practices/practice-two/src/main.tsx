import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

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
      <RouterProvider router={routes} />
    </SWRConfig>
  </React.StrictMode>
);
