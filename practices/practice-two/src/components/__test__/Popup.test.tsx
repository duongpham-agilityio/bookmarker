import { render } from '@testing-library/react';

// Components
import Popup, { PopupProps } from 'components/Popup';

const setup = (props: PopupProps) => render(<Popup {...props} />);

describe('Popup component', () => {
  it('Match to snapshot', () => {
    const { container } = setup({});

    expect(container).toMatchSnapshot();
  });
});
