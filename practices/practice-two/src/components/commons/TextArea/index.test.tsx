import { fireEvent, render } from '@testing-library/react';

// Component
import { TextArea } from 'components/commons';

const setup = (callback: () => void) =>
  render(
    <TextArea
      value="Hello, World"
      placeholder="Enter text..."
      onChange={callback}
    />
  );

describe('TextArea', () => {
  it('match snapshot', () => {
    const { asFragment } = setup(jest.fn());

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = setup(jest.fn());

    expect(getByText(/Hello, World/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = setup(mockOnChange);
    const input = getByPlaceholderText(/Enter text.../i);

    fireEvent.change(input, {
      target: {
        value: 'Hi',
      },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
