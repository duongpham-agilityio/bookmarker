import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Mocks
import './mocks/image.test';

// Component
import ChooseImage from 'components/Form/ChooseImage';

const setup = (props: { name: string; chooseHandler: () => void }) =>
  render(<ChooseImage {...props} />);

describe('ChooseImage component', () => {
  it('Match snapshot', () => {
    const { container } = setup({
      name: 'image.jpg',
      chooseHandler: jest.fn(),
    });

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    const onClick = jest.fn();
    const { getByRole } = setup({
      name: '',
      chooseHandler: onClick,
    });
    const button = getByRole('button');

    act(() => {
      fireEvent.click(button);
    });

    expect(onClick).toBeCalled();
  });
});
