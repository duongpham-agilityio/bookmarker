// Mocks
import 'components/__test__/mocks/image.test';

import { act, fireEvent, render } from '@testing-library/react';
import * as Router from 'react-router-dom';
import { ReactNode } from 'react';

// Hooks
import * as hooks from 'hooks';

// Components
import Detail from 'pages/Detail';

// Providers
import { PopupProvider, ToastProvider } from 'contexts';

// Mocks data
import { books } from 'mock-data';

// Constants
import { MESSAGES } from '@constants';

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Router.BrowserRouter>
    <ToastProvider>
      <PopupProvider>{children}</PopupProvider>
    </ToastProvider>
  </Router.BrowserRouter>
);

const setup = () =>
  render(<Detail />, {
    wrapper: Wrapper,
  });

const defaultData: ReturnType<typeof hooks.useBook> = {
  deleteBook: jest.fn(),
  data: books[0],
  error: false,
  mutate: jest.fn(),
  isValidating: false,
  isLoading: false,
};

describe('Detail page', () => {
  it('Match to snapshot', () => {
    jest.spyOn(hooks, 'useBook').mockReturnValue(defaultData);
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render with null data', () => {
    jest.spyOn(hooks, 'useBook').mockReturnValue({
      ...defaultData,
      data: undefined,
    });
    const { getByText } = setup();

    expect(getByText(MESSAGES.EMPTY_FIELD_DESCRIPTION)).toBeInTheDocument();
  });

  it('Render with error', () => {
    jest.spyOn(hooks, 'useBook').mockReturnValue({
      ...defaultData,
      error: true,
    });
    const { getByText } = setup();

    expect(getByText(MESSAGES.ERROR_DESCRIPTION)).toBeInTheDocument();
  });

  it('Navigate', () => {
    const navigate = jest.fn();
    jest.spyOn(hooks, 'useBook').mockReturnValue(defaultData);
    jest.spyOn(Router, 'useNavigate').mockReturnValue(navigate);
    const { getByTestId } = setup();
    const backBtn = getByTestId('back-btn');

    fireEvent.click(backBtn);

    expect(navigate).toBeCalled();
  });

  it('Edit book', () => {
    jest.spyOn(hooks, 'useBook').mockReturnValue(defaultData);
    const { getByTestId } = setup();
    const backBtn = getByTestId('edit-btn');

    act(() => {
      fireEvent.click(backBtn);
    });
  });
});
