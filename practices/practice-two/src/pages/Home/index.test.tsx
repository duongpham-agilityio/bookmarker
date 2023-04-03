import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

// Pages
import { Home } from 'pages';

const data = [
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
    id: 1,
  },
  {
    name: 'HTML/CSS Ebook 2',
    description: 'Description of some book will displayed here',
    author: 'Duong.Pham',
    imageURL:
      'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    createdAt: 1680158351376,
    deletedAt: null,
    updatedAt: 1680158351376,
    publishDate: 1680158351376,
    id: 2,
  },
  {
    name: 'HTML/CSS Ebook 3',
    description: 'Description of some book will displayed here',
    author: 'Duong.Pham',
    imageURL:
      'http://books.google.com/books/content?id=KzzXzqLzXi8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    createdAt: 1680158351376,
    deletedAt: null,
    updatedAt: 1680158351376,
    publishDate: 1680158351376,
    id: 3,
  },
];

const setup = async () =>
  await act(() =>
    render(
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Home />
        </Suspense>
      </BrowserRouter>
    )
  );

jest.mock('components', () => ({
  Card: ({ title }: { title: string }) => <p>{title}</p>,
  Error: () => <p>Error</p>,
}));

jest.mock('assets/icons/search.svg', () => ({
  default: 'assets/icons/search.svg',
}));

jest.mock('assets/icons/add.svg', () => ({
  default: 'assets/icons/add.svg',
}));

jest.mock('hooks', () => ({
  useBooks: jest
    .fn()
    .mockReturnValue({ data, param: { page: 1, sort: '' }, pagination: [1] }),
  useDebounce: jest.fn(),
}));

describe('Home', () => {
  it('match snapshot', async () => {
    const { asFragment } = await setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', async () => {
    const { findAllByText } = await setup();

    expect((await findAllByText(/HTML\/CSS Ebook/i)).length).toBe(3);
  });

  it('action', async () => {
    const mockDispatcher = jest.fn();
    const { findByText } = await setup();
    const button = await findByText(/create/i);

    button.addEventListener('click', mockDispatcher);

    act(() => {
      fireEvent.click(button);
    });

    expect(mockDispatcher).toHaveBeenCalled();
  });
});
