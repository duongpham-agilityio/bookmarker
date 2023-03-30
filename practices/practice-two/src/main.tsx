import { Card } from 'components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Styles
import 'styles/index.module.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div
        className=""
        style={{
          width: '1440px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '22px',
          margin: '50px auto',
        }}
      >
        <Card
          title="HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook"
          description="Description of some
        book will displayed here Description of some
        book will displayed here Description of some
        book will displayed here"
          publishedDate="9:00 AM"
          imageUrl=""
        />

        <Card
          title="HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook"
          description="Description of some
        book will displayed here"
          publishedDate="9:00 AM"
          imageUrl=""
        />

        <Card
          title="HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook"
          description="Description of some
        book will displayed here"
          publishedDate="9:00 AM"
          imageUrl=""
        />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
