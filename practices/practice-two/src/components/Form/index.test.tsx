import { fireEvent, render } from '@testing-library/react';

// Component
import { Form } from 'components';
import { Book } from 'types';

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

const setup = (onClose?: () => void) =>
  render(<Form value={value} onClose={onClose} />);

const value: Omit<Book, 'createdAt' | 'deletedAt' | 'updatedAt'> = {
  author: 'John',
  name: 'HTML/CSS',
  description: 'HTML/CSS with styles',
  imageURL: '',
  publishDate: new Date().getTime(),
};

describe('FormComponent', () => {
  it('match snapshot', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = setup();

    expect(getByText(/Save/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockHandleSubmit = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnChange = jest.fn();
    const { getByText, getAllByPlaceholderText } = setup(mockOnClose);
    const saveBtn = getByText(/Save/i);
    const cancelBtn = getByText(/Cancel/i);
    const input = getAllByPlaceholderText(/book name/i);

    saveBtn.addEventListener('click', mockHandleSubmit);
    input[0].addEventListener('change', mockOnChange);

    // click button submit
    fireEvent.click(saveBtn);
    expect(mockHandleSubmit).toHaveBeenCalled();

    // click button cancel
    fireEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalled();

    // change input
    fireEvent.change(input[0], {
      target: {
        value: 'HTML/CSS',
      },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
