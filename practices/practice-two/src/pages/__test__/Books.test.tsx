// Mocks
import 'components/__test__/mocks/image.test';

import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Books, { BooksProps } from 'pages/Home/Books';

// Mock data
import { books } from 'mock-data';

// Constants
import { MESSAGES } from '@constants';

const Component = (props: BooksProps) => (
  <BrowserRouter>
    <Books {...props} />
  </BrowserRouter>
);

const setup = (props: BooksProps) => render(<Component {...props} />);

describe('Books components', () => {
  it('Match to snapshot', () => {
    const { container } = setup({
      books: books.slice(0, 5),
      onDeleteBook: jest.fn(),
    });

    expect(container).toMatchSnapshot();
  });

  it('Delete book', () => {
    const { getAllByRole } = setup({
      books: books.slice(0, 5),
      onDeleteBook: jest.fn(),
    });

    const buttons = getAllByRole('button');

    fireEvent.click(buttons[1]);
  });

  it('Empty books', () => {
    const { getByText, rerender, getAllByRole } = setup({
      books: [],
      onDeleteBook: jest.fn(),
      children: <p>Hello</p>,
    });

    expect(getByText(MESSAGES.EMPTY_DESCRIPTION)).toBeInTheDocument();

    rerender(
      <Component
        onDeleteBook={jest.fn()}
        books={[
          {
            name: 'HTML/CSS Ebook 1',
            description: 'Description of some book will displayed here',
            author: 'Duong.Pham',
            imageURL:
              'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            createdAt: 1680158351376,
            deletedAt: null,
            updatedAt: 1680158351376,
            publishDate: 1680158351376,
          },
        ]}
      >
        <p>Hello</p>
      </Component>
    );

    const buttons = getAllByRole('button');

    fireEvent.click(buttons[1]);
  });
});
