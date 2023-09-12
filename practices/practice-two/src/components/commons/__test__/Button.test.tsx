import { fireEvent, render } from '@testing-library/react';

import Button from 'components/commons/Button';

describe('Button', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<Button label="click me" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(<Button label="click me" />);

    expect(getByText(/click me/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button label="click me" onClick={mockOnClick} />
    );
    const btn = getByText(/click me/i);

    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
