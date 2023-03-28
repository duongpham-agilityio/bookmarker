import { Meta, Story } from '@storybook/react';

// Component
import { Button, ButtonProps } from 'components/commons';

// Assets
import TrashIcon from 'assets/icons/trash.svg';

export default {
  title: 'Practice/components/commons/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'default',
  border: 'b-lg',
  size: 'small',
  width: 'w-lg',
};

export const Primary = Template.bind({});
Primary.args = {
  label: '1',
  size: 'small',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'secondary',
  size: 'medium',
  variant: 'secondary',
  border: 'b-lg',
  width: 'w-lg',
};

export const Danger = Template.bind({});
Danger.args = {
  label: '',
  leftIcon: TrashIcon,
  size: 'medium',
  variant: 'danger',
};
