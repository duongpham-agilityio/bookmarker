import { Meta, Story } from '@storybook/react';

import { Header } from 'layouts';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Practice/layouts/Header',
  component: Header,
} as Meta;

export const Index: Story = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);
