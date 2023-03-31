import { render } from '@testing-library/react';

// Component
import DetailSkeleton from 'pages/Detail/Skeleton';

describe('DetailSkeleton', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<DetailSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
