import { render } from '@testing-library/react';

// Component
import { Notification } from 'components';

jest.mock('assets/icons/x-letter.svg', () => ({
  default: 'assets/icons/x-letter.svg',
}));

describe('Notification', () => {
  it('match snapshot', () => {
    const { asFragment } = render(
      <Notification title="Title" message="message" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(
      <Notification title="Title" message="message" />
    );

    expect(getByText(/message/i)).toBeInTheDocument();
  });
});
