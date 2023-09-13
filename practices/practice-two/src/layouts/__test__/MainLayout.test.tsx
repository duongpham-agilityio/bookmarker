// Mocks
import 'components/__test__/mocks/image.test';

import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// Components
import MainLayout from 'layouts/MainLayout';

const setup = () =>
  render(
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );

describe('MainLayout', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
