// Mocks
import 'components/__test__/mocks/image.test';

import { render } from '@testing-library/react';

// Components
import Pending from 'pages/Home/Pending';

describe('Pending', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Pending />);

    expect(container).toMatchSnapshot();
  });
});
