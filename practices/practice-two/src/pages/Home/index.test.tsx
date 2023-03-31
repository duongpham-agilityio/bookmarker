import { act, render } from '@testing-library/react';
import { CardProps } from 'components';

// Component
import { Home } from 'pages';
import { Suspense } from 'react';

const setup = async () =>
  await act(() =>
    render(
      <Suspense fallback={<p>Loading...</p>}>
        <Home />
      </Suspense>
    )
  );

jest.mock('components', () => ({
  Card: (props: CardProps) => <p>{props.title}</p>,
}));

jest.mock('assets/icons/search.svg', () => ({
  default: 'assets/icons/search.svg',
}));

jest.mock('assets/icons/add.svg', () => ({
  default: 'assets/icons/add.svg',
}));

describe('Home', () => {
  it('match snapshot', async () => {
    const { asFragment } = await setup();
  });
});
