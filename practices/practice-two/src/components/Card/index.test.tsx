import { fireEvent, render } from '@testing-library/react';
import { LinkProps } from 'react-router-dom';
import { MouseEvent } from 'react';

// Component
import { Card } from 'components';

jest.mock('react-router-dom', () => ({
  Link: ({ children }: LinkProps) => <>{children}</>,
}));

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

const mockData = {
  title: 'HTML/CSS Ebook',
  description: `Description of some
  book will displayed here Description of some
  book will displayed here Description of some
  book will displayed here`,
  publishedDate: '9:00 AM',
  imageUrl: '',
};

const setup = (mockFunction: (_event: MouseEvent) => void) =>
  render(<Card {...mockData} onDelete={mockFunction} />);

describe('Card', () => {
  it('match snapshot', () => {
    const { asFragment } = setup(jest.fn());

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = setup(jest.fn());

    expect(getByText('HTML/CSS Ebook')).toMatchSnapshot();
  });

  it('action', () => {
    const mockAction = jest.fn();
    const { getAllByRole } = setup(mockAction);
    const btns = getAllByRole('button');

    btns[1].addEventListener('click', (event) => {
      event.preventDefault();
      mockAction(event);
    });

    fireEvent.click(btns[1]);

    expect(mockAction).toHaveBeenCalled();
  });
});
