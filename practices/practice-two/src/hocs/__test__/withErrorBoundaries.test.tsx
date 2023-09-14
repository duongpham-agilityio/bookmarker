// Mocks
import 'components/__test__/mocks/image.test';

import { render } from '@testing-library/react';

// Constants
import { MESSAGES } from '@constants';

// HOCs
import { withErrorBoundaries } from 'hocs/withErrorBoundaries';

const RejectComponent = () => {
  const isCondition = true;

  if (isCondition) throw new Error(MESSAGES.ERROR_DESCRIPTION);

  return <p>Reject</p>;
};

const ResolveComponent = () => {
  return <p>Resolve</p>;
};

describe('withErrorBoundaries', () => {
  it('Match to snapshot', () => {
    const Component = withErrorBoundaries(ResolveComponent);
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('Render reject component', () => {
    const Component = withErrorBoundaries(RejectComponent);
    const { getByText } = render(<Component />);

    expect(getByText(MESSAGES.ERROR_DESCRIPTION)).toBeInTheDocument();
  });
});
