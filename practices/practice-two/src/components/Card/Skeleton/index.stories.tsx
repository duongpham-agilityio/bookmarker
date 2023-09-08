import { Meta, Story } from '@storybook/react';

// Component
import { CardSkeleton } from 'components';

export const Template: Story = () => <CardSkeleton />;

export default {
  title: 'Practice/components/Card/CardSkeleton',
  component: CardSkeleton,
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
