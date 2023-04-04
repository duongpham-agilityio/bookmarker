import { render } from '@testing-library/react';
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

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

const Success = () => {
  return <p>test</p>;
};

describe('withErrorBoundaries', () => {
  it('render success', () => {
    const Wrapper = withErrorBoundaries(Success);
    const { getByText } = render(<Wrapper />);

    expect(getByText(/test/i).innerHTML).toBe('test');
  });
});
