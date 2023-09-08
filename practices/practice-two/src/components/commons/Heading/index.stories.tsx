import { Meta, Story } from '@storybook/react';

// Component
import { Heading, HeadingProps } from 'components/commons';

export default {
  title: 'Practice/components/commons/Heading',
  component: Heading,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: ' 50px 20px',
          textAlign: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Small = Template.bind({});
Small.args = {
  label: 'Small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium',
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large',
  size: 'lg',
};

export const Extralarge = Template.bind({});
Extralarge.args = {
  label: 'Extra large',
  size: 'xl',
};
