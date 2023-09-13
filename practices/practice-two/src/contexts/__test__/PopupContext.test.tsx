import { fireEvent, render } from '@testing-library/react';

// Hooks
import { usePopupContext } from 'hooks';

// Mocks
import 'components/__test__/mocks/image.test';

// Providers
import PopupProvider from 'contexts/Popup';

const Child = () => {
  const { dispatch } = usePopupContext();

  return <button onClick={() => dispatch(() => {})}>Open popup</button>;
};
const setup = () =>
  render(<Child />, {
    wrapper: PopupProvider,
  });

describe('Popup context', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    const { getByText, getByRole } = setup();
    const openBtn = getByRole('button');

    fireEvent.click(openBtn);

    const acceptBtn = getByText('Ok');

    fireEvent.click(acceptBtn);

    expect(acceptBtn).not.toBeInTheDocument();
  });

  it('Close popup', () => {
    const { getByText, getByRole } = setup();
    const openBtn = getByRole('button');

    fireEvent.click(openBtn);

    const cancelBtn = getByText('Cancel');

    fireEvent.click(cancelBtn);

    expect(cancelBtn).not.toBeInTheDocument();
  });
});
