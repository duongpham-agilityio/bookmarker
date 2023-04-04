import { render } from '@testing-library/react';

import { Header } from 'layouts';

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

jest.mock('react-router-dom', () => ({
  Link: () => <a href="">header</a>,
}));

describe('Header', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(<Header />);

    expect(getByText(/header/i)).toBeInTheDocument();
  });
});
