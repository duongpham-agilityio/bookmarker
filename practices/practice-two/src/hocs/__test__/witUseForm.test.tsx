// Mocks
import 'components/__test__/mocks/image.test';

import { fireEvent, render, waitFor } from '@testing-library/react';
import { books } from 'mock-data';

// HOCs
import { WithUseFormProps, withUseForm } from 'hocs/withUseForm';
import { ReactNode } from 'react';
import { ToastProvider } from 'contexts';

const Component = ({ dispatchAction }: WithUseFormProps) => {
  return (
    <>
      <button
        onClick={() => {
          dispatchAction({
            formData: books[0],
            title: 'Form',
            type: 'create',
          });
        }}
        data-testid="create-btn"
      >
        Create
      </button>
      <button
        onClick={() => {
          dispatchAction({
            formData: books[0],
            title: 'Form',
            type: 'update',
          });
        }}
        data-testid="update-btn"
      >
        Update
      </button>
    </>
  );
};

const MockComponent = withUseForm(Component);
const Wrapper = ({ children }: { children: ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

const setup = () =>
  render(<MockComponent />, {
    wrapper: Wrapper,
  });

describe('withUseForm', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Create action', async () => {
    const { getByTestId, container } = setup();

    fireEvent.click(getByTestId('create-btn'));

    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
