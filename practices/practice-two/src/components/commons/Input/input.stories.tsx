import { Meta, Story } from '@storybook/react';

// Components
import { Input, InputProps } from 'components/commons';

// Assets
import SearchIcon from 'assets/icons/search.svg';

export default {
  title: 'Practice/components/commons/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '350px',
          margin: '20px auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Search = Template.bind({});
Search.args = {
  placeholder: 'Search something...',
  leftIcon: SearchIcon,
};

export const Date = Template.bind({});
Date.args = {
  type: 'date',
};

export const Text = Template.bind({});
Text.args = {
  placeholder: 'Book name',
};
