import { act, fireEvent, render } from '@testing-library/react';

// Hook
import { useToastContext } from 'hooks';

// Mocks
import 'components/__test__/mocks/image.test';

// Providers
import ToastProvider from 'contexts/Toast';

const Child = () => {
  const { setNotification } = useToastContext();

  return (
    <button
      onClick={() => {
        setNotification({
          title: 'Success',
          message: 'Add on success',
        });
      }}
    >
      Show toast
    </button>
  );
};

const setup = () =>
  render(<Child />, {
    wrapper: ToastProvider,
  });

describe('Toast context', () => {
  it('Match to snapshot', async () => {
    const { container } = await setup();

    expect(container).toMatchSnapshot();
  });

  jest.useFakeTimers();
  it('Render with props', async () => {
    const { getByRole, getByText } = setup();
    const btn = getByRole('button');

    act(() => {
      fireEvent.click(btn);
    });

    const pEl = getByText('Add on success');

    expect(pEl).toBeInTheDocument();

    act(() => {
      fireEvent.click(btn);
      jest.runAllTimers();
    });

    expect(pEl).not.toBeInTheDocument();
  });
});
