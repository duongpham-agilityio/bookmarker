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

const value: Omit<Book, 'createdAt' | 'deletedAt' | 'updatedAt'> = {
  author: 'John',
  name: 'HTML/CSS',
  description: 'HTML/CSS with styles',
  imageURL: '',
  publishDate: new Date().getTime(),
};

describe('FormComponent', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<Form value={value} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(<Form value={value} />);

    expect(getByText(/Save/i)).toBeInTheDocument();
  });

  it('action', () => {
    const mockHandleSubmit = jest.fn();
    const mockOnClose = jest.fn();

    const { getByText } = render(<Form value={value} onClose={mockOnClose} />);
    const saveBtn = getByText(/Save/i);
    const cancelBtn = getByText(/Cancel/i);

    saveBtn.addEventListener('click', mockHandleSubmit);

    // click button submit
    fireEvent.click(saveBtn);

    // click button cancel
    fireEvent.click(cancelBtn);

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
