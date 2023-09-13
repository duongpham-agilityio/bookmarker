import { fireEvent, render } from '@testing-library/react';

import { Input } from 'components/commons';

const setup = (callback: () => void) =>
  render(<Input value="" onChange={callback} placeholder="Enter" />);

describe('Input', () => {
  it('match snapshot', () => {
    const { asFragment } = setup(jest.fn());

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByPlaceholderText } = setup(jest.fn());

    expect(getByPlaceholderText(/Enter/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = setup(mockOnChange);
    const input = getByPlaceholderText(/Enter/i);

    fireEvent.change(input, {
      target: {
        value: '1',
      },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('Render with textArea', () => {
    const { getByTestId } = render(
      <Input variant="area" data-testid="custom-element" />
    );

    const textArea = getByTestId('custom-element');

    expect(textArea).toBeInTheDocument();
  });
});
