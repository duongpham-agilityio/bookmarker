import { act, fireEvent, render } from '@testing-library/react';

// Context
import { ToastContext } from 'contexts/Toast/context';
import { useContext } from 'react';

const mockDispatcher = jest.fn();

const Children = () => {
  const { setNotification } = useContext(ToastContext);

  return (
    <button
      onClick={() => setNotification({ message: 'message', title: 'title' })}
    >
      Click me
    </button>
  );
};

const setup = () => {
  return (
    <ToastContext.Provider
      value={{
        setNotification: mockDispatcher,
      }}
    >
      <Children />
    </ToastContext.Provider>
  );
};

describe('ToastContext', () => {
  it('Pass props', () => {
    const { getByText } = render(setup());

    const btn = getByText('Click me');

    act(() => {
      fireEvent.click(btn);
    });

    expect(mockDispatcher).toHaveBeenCalled();
  });
});
