import { Meta, Story } from '@storybook/react';

// Components
import { Card, CardProps } from 'components';
import { BrowserRouter } from 'react-router-dom';

export const Template: Story<CardProps> = () => (
  <BrowserRouter>
    <Card
      title="HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook HTML/CSS Ebook"
      description="Description of some
  book will displayed here Description of some
  book will displayed here Description of some
  book will displayed here"
      publishedDate="9:00 AM"
      imageUrl=""
    />
  </BrowserRouter>
);

export default {
  title: 'Practice/components/Card',
  component: Card,
  decorators: [
    (Story) => (
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
        <Story />
        <Story />
      </div>
    ),
  ],
} as Meta;
