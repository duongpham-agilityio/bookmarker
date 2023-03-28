import { Notification } from 'components';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import 'styles/index.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="">
      <Notification
        title="Your actions executed successfully!"
        message="A book has been removed from the system, this action can not undo."
      />
    </div>
  </React.StrictMode>
);
