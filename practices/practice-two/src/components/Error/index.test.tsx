import { MESSAGES } from '@constants';
import { render } from '@testing-library/react';

import { Error } from 'components';

const setup = () => render(<Error />);

jest.mock('assets/icons/x-letter.svg', () => ({
  default: 'assets/icons/x-letter.svg',
}));

jest.mock('assets/icons/upload.svg', () => ({
  default: 'assets/icons/upload.svg',
}));

jest.mock('assets/icons/next.svg', () => ({
  default: 'assets/icons/next.svg',
}));

jest.mock('assets/icons/trash.svg', () => ({
  default: 'assets/icons/trash.svg',
}));

jest.mock('assets/icons/back.svg', () => ({
  default: 'assets/icons/back.svg',
}));

jest.mock('assets/icons/pencil.svg', () => ({
  default: 'assets/icons/pencil.svg',
}));

describe('Error', () => {
  it('match snapshot', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = setup();
    expect(getByText(MESSAGES.ERROR_TITLE)).toBeInTheDocument();
  });
});
