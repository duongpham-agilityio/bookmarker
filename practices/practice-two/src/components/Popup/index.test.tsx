import { fireEvent, render } from '@testing-library/react';

// Component
import { Popup } from 'components';

jest.mock('assets/icons/x-letter.svg', () => ({
  default: 'assets/icons/x-letter.svg',
}));

jest.mock('assets/icons/upload.svg', () => ({
  default: 'assets/icons/upload.svg',
}));

describe('Popup', () => {
  it('match snapshot', () => {
    const { asFragment } = render(
      <Popup
        title="Are you sure to deleted this book"
        description="This action can not undo, so please careful with this action"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(
      <Popup
        title="Are you sure to deleted this book"
        description="This action can not undo, so please careful with this action"
      />
    );

    expect(getByText(/Are you sure to deleted this book/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockOnAccept = jest.fn();
    const mockOnCancel = jest.fn();
    const { getAllByRole } = render(
      <Popup
        title="Are you sure to deleted this book"
        description="This action can not undo, so please careful with this action"
        onAccept={mockOnAccept}
        onCancel={mockOnCancel}
      />
    );
    const btns = getAllByRole('button');

    fireEvent.click(btns[0]);
    fireEvent.click(btns[1]);

    expect(mockOnAccept).toHaveBeenCalled();
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
