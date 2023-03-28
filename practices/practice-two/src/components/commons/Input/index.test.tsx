import { fireEvent, render } from '@testing-library/react';

import { Input } from 'components/commons';

describe('Input', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<Input />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter" />);

    expect(getByPlaceholderText(/Enter/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter" onChange={mockOnChange} />
    );
    const input = getByPlaceholderText(/Enter/i);

    fireEvent.change(input, {
      target: {
        value: '1',
      },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
