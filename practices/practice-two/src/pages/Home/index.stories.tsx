import { Meta, Story } from '@storybook/react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Component
import Home from 'pages/Home';

export default {
  title: 'Practice/pages/Home',
  component: Home,
  decorators: [(Story) => <Story />],
} as Meta;

export const Template: Story = () => (
  <BrowserRouter>
    <Suspense fallback={<p>Loading...</p>}>
      <Home />
    </Suspense>
  </BrowserRouter>
);
