import { Meta, Story } from '@storybook/react';

// Component
import { TextArea, TextAreaProps } from 'components/commons';

export const Template: Story<TextAreaProps> = () => (
  <TextArea placeholder="Description" />
);

export default {
  title: 'practice/components/commons/TextArea',
  component: TextArea,
  decorators: [
    (Story) => (
      <div
        className=""
        style={{
          width: '350px',
          margin: '50px auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
