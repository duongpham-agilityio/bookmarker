import { render } from '@testing-library/react';

// Component
import { CardSkeleton } from 'components';

jest.mock('assets/icons/x-letter.svg', () => ({
  default: 'assets/icons/x-letter.svg',
}));

jest.mock('assets/icons/upload.svg', () => ({
  default: 'assets/icons/upload.svg',
}));

describe('CardSkeleton', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<CardSkeleton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
