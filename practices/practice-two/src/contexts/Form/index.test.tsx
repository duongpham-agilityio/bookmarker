import { render, act, fireEvent } from '@testing-library/react';
import { useContext } from 'react';

// Context
import { FormContext } from 'contexts/Form/context';

const mockDispatcher = jest.fn();

const Children = () => {
  const { dispatch } = useContext(FormContext);

  return <button onClick={() => dispatch(undefined)}>Click me</button>;
};

const setup = () => {
  return (
    <FormContext.Provider
      value={{
        dispatch: mockDispatcher,
      }}
    >
      <Children />
    </FormContext.Provider>
  );
};

describe('FormContext', () => {
  it('Pass props', () => {
    const { getByText } = render(setup());

    const btn = getByText('Click me');

    act(() => {
      fireEvent.click(btn);
    });

    expect(mockDispatcher).toHaveBeenCalled();
  });
});
