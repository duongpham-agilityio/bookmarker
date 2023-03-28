import { render } from '@testing-library/react';

import { Header } from 'layouts';

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
