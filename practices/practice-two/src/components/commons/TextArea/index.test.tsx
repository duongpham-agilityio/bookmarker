import { fireEvent, render } from '@testing-library/react';

// Component
import { TextArea } from 'components/commons';

describe('TextArea', () => {
  it('match snapshot', () => {
    const { asFragment } = render(
      <TextArea value="Hello, World" placeholder="Enter text..." />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(
      <TextArea value="Hello, World" placeholder="Enter text..." />
    );

    expect(getByText(/Hello, World/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TextArea
        value="Hello, World"
        placeholder="Enter text..."
        onChange={mockOnChange}
      />
    );
    const input = getByPlaceholderText(/Enter text.../i);

    fireEvent.change(input, {
      target: {
        value: 'Hi',
      },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
