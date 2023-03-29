import { Meta, Story } from '@storybook/react';

import { Notification, NotificationProps } from 'components';

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;
export const Success = Template.bind({});
export const Error = Template.bind({});
export const Warning = Template.bind({});
export const Info = Template.bind({});

Success.args = {
  title: 'Your actions executed successfully!',
  message: 'A book has been removed from the system, this action can not undo.',
};

Error.args = {
  title: 'Your actions executed successfully!',
  message: 'A book has been removed from the system, this action can not undo.',
  type: 'error',
};

Warning.args = {
  title: 'Your actions executed successfully!',
  message: 'A book has been removed from the system, this action can not undo.',
  type: 'warning',
};

Info.args = {
  title: 'Your actions executed successfully!',
  message: 'A book has been removed from the system, this action can not undo.',
  type: 'info',
};

export default {
  title: 'Practice/components/Notification',
  component: Notification,
  decorators: [
    (Story) => (
      <div
        className=""
        style={{
          margin: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
