import { Meta, Story } from '@storybook/react';

// Component
import { Popup, PopupProps } from 'components';

export const Template: Story<PopupProps> = () => (
  <Popup
    title="Are you sure to deleted this book"
    description="This action can not undo, so please careful with this action"
  />
);

export default {
  title: 'Practice/components/Popup',
  component: Popup,
} as Meta;
