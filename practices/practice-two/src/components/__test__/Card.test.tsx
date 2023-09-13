// Mocks
import 'components/__test__/mocks/image.test';

import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';

// Components
import Card, { CardProps } from 'components/Card';
import { ButtonProps } from 'components/commons';

// Types
import { LinkProps } from 'react-router-dom';

jest.mock('components/commons/Button', () => ({
  default: ({ onClick }: ButtonProps) => (
    <button onClick={onClick}>Icon</button>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to, className }: LinkProps) => (
    <a href={to.toString()} className={className}>
      {children}
    </a>
  ),
}));

const setup = (props: CardProps) => render(<Card {...props} />);

describe('Card', () => {
  it('Match snapshot', () => {
    const { container } = setup({
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, dicta.',
      publishedDate: '1955-08-15',
      imageUrl:
        'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      title: 'Lorem ipsum dolor',
    });

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    const mockOnDeleteBook = jest.fn();
    const { getByRole, getAllByRole } = setup({
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, dicta.',
      publishedDate: '1955-08-15',
      imageUrl: '',
      title: 'Lorem ipsum dolor',
      href: 'books/1',
      onDeleteBook: mockOnDeleteBook,
    });

    const linkElement = getByRole('link');
    const buttons = getAllByRole('button');
    expect(linkElement.getAttribute('href')).toBe('books/1');

    act(() => {
      fireEvent.click(buttons[1]);
    });

    expect(mockOnDeleteBook).toBeCalled();
  });
});
