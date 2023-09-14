// Mocks
import 'components/__test__/mocks/image.test';

import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Hooks
import * as hooks from 'hooks';

// Components
import Home from 'pages/Home';

// Providers
import { ToastProvider } from 'contexts';

// Mocks data
import { books } from 'mock-data';

// constants
import { MESSAGES, SORT } from '@constants';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <ToastProvider>{children}</ToastProvider>
  </BrowserRouter>
);

const setup = () =>
  render(<Home />, {
    wrapper: Wrapper,
  });

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
}));

const mockData: ReturnType<typeof hooks.useBooks> = {
  param: { sort: '', page: 1, name: 'html' },
  deleteBook: jest.fn(),
  data: books,
  pagination: [0, 1, 2, 3],
  setSearchParam: jest.fn(),
  convertSearchParamsToString: jest.fn(),
  error: undefined,
  mutate: jest.fn(),
  isValidating: false,
  isLoading: false,
};

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Match to snapshot', () => {
    jest.spyOn(hooks, 'useBooks').mockReturnValue(mockData);

    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Error fetching ', () => {
    jest.spyOn(hooks, 'useBooks').mockReturnValue({ ...mockData, error: true });

    const { getByText } = setup();

    expect(getByText(MESSAGES.ERROR_TITLE)).toBeInTheDocument();
  });

  it('Load data', () => {
    jest
      .spyOn(hooks, 'useBooks')
      .mockReturnValue({ ...mockData, isLoading: true });
    const { getAllByTestId } = setup();

    expect(getAllByTestId('card-skeleton').length).toBeGreaterThan(0);
  });

  it('Render data', () => {
    jest.spyOn(hooks, 'useBooks').mockReturnValue({
      ...mockData,
      param: { sort: SORT.DESCENDING, page: 1, name: 'html' },
    });

    const { getByPlaceholderText } = setup();
    const input = getByPlaceholderText('Search something...');

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'html',
        },
      });
    });

    expect((input as HTMLInputElement).value).toBe('html');
  });

  it('Create book', async () => {
    jest.spyOn(hooks, 'useBooks').mockReturnValue({
      ...mockData,
      param: { sort: SORT.ASCENDING, page: 1, name: 'html' },
    });

    const { getAllByRole } = setup();
    const buttons = getAllByRole('button');

    act(() => {
      fireEvent.click(buttons[2]);
    });
  });

  it('Change page', () => {
    jest.spyOn(hooks, 'useBooks').mockReturnValue(mockData);

    const { getAllByTestId } = setup();
    const buttons = getAllByTestId('pagination');

    act(() => {
      fireEvent.click(buttons[1]);
    });
  });
});
