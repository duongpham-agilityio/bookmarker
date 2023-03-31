import { Detail } from 'pages';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

// Helpers
import { fetcher } from 'helpers';

// Styles
import 'styles/index.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Detail />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
