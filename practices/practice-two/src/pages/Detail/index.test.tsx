import { act, fireEvent, render } from '@testing-library/react';
import { Suspense } from 'react';

// Pages
import { Detail } from 'pages';
import { BrowserRouter } from 'react-router-dom';

const setup = async () => {
  return await act(() =>
    render(
      <Suspense>
        <BrowserRouter>
          <Detail />
        </BrowserRouter>
      </Suspense>
    )
  );
};

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

jest.mock('hooks', () => ({
  useBook: jest.fn().mockReturnValue({
    data: {
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
  }),
}));

describe('Details', () => {
  it('match snapshot', async () => {
    const { asFragment } = await setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', async () => {
    const { findByText } = await setup();

    expect(await findByText(/HTML\/CSS Ebook 1/i)).toBeInTheDocument();
  });

  it('action', async () => {
    const mockDispatcher = jest.fn();
    const { findByText } = await setup();
    const button = await findByText(/edit/i);

    button.addEventListener('click', mockDispatcher);

    act(() => {
      fireEvent.click(button);
    });

    expect(mockDispatcher).toHaveBeenCalled();
  });
});
