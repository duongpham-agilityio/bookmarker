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
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  jest.useFakeTimers();
  it('Render with props', () => {
    const { getByRole } = setup();
    const btn = getByRole('button');

    act(() => {
      fireEvent.click(btn);
      jest.runAllTimers();
    });
  });
});
