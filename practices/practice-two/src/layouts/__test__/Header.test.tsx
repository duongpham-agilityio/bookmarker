import { render } from '@testing-library/react';

// Components
import Header from 'layouts/Header';
import { BrowserRouter } from 'react-router-dom';

const setup = () =>
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

describe('Header', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
