import { Popup } from 'components';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import 'styles/index.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Popup
      title="Are you sure to deleted this book"
      description="This action can not undo, so please careful with this action"
    />
  </React.StrictMode>
);
