import { render } from '@testing-library/react';

// Mocks
import './mocks/image.test';

// Components
import Notification, { NotificationProps } from 'components/Notification';

const setup = (props: NotificationProps) => render(<Notification {...props} />);

describe('Notification component', () => {
  const mockProps: NotificationProps = {
    title: 'Success',
    message: 'Send request success',
  };

  it('Match to snapshot', () => {
    const { container } = setup(mockProps);

    expect(container).toMatchSnapshot();
  });
});
