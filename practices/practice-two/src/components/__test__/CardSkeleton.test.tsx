import { render } from '@testing-library/react';

// Components
import CardSkeleton from 'components/Card/Skeleton';

// Types
import { ButtonProps } from 'components/commons';

jest.mock('components/commons/Button', () => ({
  default: ({ onClick }: ButtonProps) => (
    <button onClick={onClick}>Icon</button>
  ),
}));

jest.mock('assets/icons/next.svg', () => ({
  default: 'assets/icons/next.svg',
}));

jest.mock('assets/icons/trash.svg', () => ({
  default: 'assets/icons/trash.svg',
}));

describe('Card skeleton', () => {
  it('Match snapshot', () => {
    const { container } = render(<CardSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
