import { render } from '@testing-library/react';

// Component
import { Notification } from 'components';

jest.mock('assets/icons/x-letter.svg', () => ({
  default: 'assets/icons/x-letter.svg',
}));

jest.mock('assets/icons/upload.svg', () => ({
  default: 'assets/icons/upload.svg',
}));

jest.mock('assets/icons/next.svg', () => ({
  default: 'assets/icons/next.svg',
}));

jest.mock('assets/icons/trash.svg', () => ({
  default: 'assets/icons/trash.svg',
}));

jest.mock('assets/icons/back.svg', () => ({
  default: 'assets/icons/back.svg',
}));

jest.mock('assets/icons/pencil.svg', () => ({
  default: 'assets/icons/pencil.svg',
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
