import { act, fireEvent, render } from '@testing-library/react';

// Context
import { PopupContext } from 'contexts/Popup/context';
import { useContext } from 'react';

const mockDispatcher = jest.fn();

const Children = () => {
  const { dispatch } = useContext(PopupContext);

  return <button onClick={() => dispatch(() => 1)}>Click me</button>;
};

const setup = () => {
  return (
    <PopupContext.Provider
      value={{
        dispatch: mockDispatcher,
      }}
    >
      <Children />
    </PopupContext.Provider>
  );
};

describe('PopupContext', () => {
  it('Pass props', () => {
    const { getByText } = render(setup());

    const btn = getByText('Click me');

    act(() => {
      fireEvent.click(btn);
    });

    expect(mockDispatcher).toHaveBeenCalled();
  });
});
