import { Meta, Story } from '@storybook/react';

// Components
import { Form, FormProps } from 'components';

export const Template: Story<FormProps> = () => (
  <Form
    value={{
      author: 'John',
      name: 'HTML/CSS',
      description: 'HTML/CSS with styles',
      imageURL: '',
      publishDate: new Date().getTime(),
    }}
    handleSubmit={() => {}}
  />
);

export default {
  title: 'Practice/components/Form',
  component: Form,
} as Meta;
