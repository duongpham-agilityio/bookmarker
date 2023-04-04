import { act, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { publicRoutes } from 'routes/public';

const indexPage = {
  home: 0,
  detail: 1,
};

const setup = (page: keyof typeof indexPage) => {
  const routes = createMemoryRouter(publicRoutes, {
    initialEntries: ['/books', '/books/1'],
    initialIndex: indexPage[page],
  });

  return render(<RouterProvider router={routes} />);
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
jest.mock('pages', () => ({
  Home: () => <p>Home page</p>,
  Detail: () => <p>Detail page</p>,
}));

describe('Router', () => {
  it('Match router / and render Home page', async () => {
    await act(() => setup('home'));

    expect(await screen.findByText(/Home page/i)).toBeInTheDocument();
  });

  it('Match router /products/:id and render Detail page', async () => {
    await act(() => setup('detail'));

    expect(await screen.findByText(/Detail page/i)).toBeInTheDocument();
  });
});
