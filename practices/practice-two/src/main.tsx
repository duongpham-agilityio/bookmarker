import { Form } from 'components';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import 'styles/index.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Form
      value={{
        author: '',
        description: '',
        imageURL: '',
        name: '',
        publishDate: new Date().getTime(),
      }}
      handleSubmit={() => {}}
    />
  </React.StrictMode>
);
