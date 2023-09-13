// Mocks
import 'components/__test__/mocks/image.test';

import { act, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Types
import { WithUseFormProps } from 'hocs';

// Hooks
import * as hooks from 'hooks';

// Components
import Home from 'pages/Home';

// Providers
import { ToastProvider } from 'contexts';

// Mocks data
import { books } from 'mock-data';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <ToastProvider>{children}</ToastProvider>
  </BrowserRouter>
);

const setup = async (props: WithUseFormProps) =>
  await act(async () =>
    render(<Home {...props} />, {
      wrapper: Wrapper,
    })
  );

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
}));

jest.spyOn(hooks, 'useBooks').mockReturnValue({
  param: { sort: '', page: 1, name: 'html' },
  deleteBook: jest.fn(),
  data: books,
  pagination: [],
  setSearchParam: jest.fn(),
  convertSearchParamsToString: jest.fn(),
  error: undefined,
  mutate: jest.fn(),
  isValidating: false,
  isLoading: false,
});

describe('Home page', () => {
  it('Match to snapshot', async () => {
    const { container } = await setup({ dispatchAction: jest.fn });

    expect(container).toMatchSnapshot();
  });

  it('Render data', () => {
    jest.spyOn(hooks, 'useBooks').mockReturnValue({
      param: { sort: '', page: 1, name: 'duong' },
      deleteBook: jest.fn(),
      data: [],
      pagination: [],
      setSearchParam: jest.fn(),
      convertSearchParamsToString: jest.fn(),
      error: undefined,
      mutate: jest.fn(),
      isValidating: false,
      isLoading: false,
    });
  });
});
