import { render } from '@testing-library/react';

// Mocks
import './mocks/button.test';
import './mocks/image.test';

// Components
import { Error } from 'components';

// Types
import { ErrorProps } from 'components/Error';

const setup = (props: ErrorProps) => render(<Error {...props} />);

describe('Error component', () => {
  it('Match snapshot', () => {
    const { container } = setup({});

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    const mockProps: ErrorProps = {
      title: 'Error',
      description: 'Error description',
    };
    const { getByText } = setup(mockProps);

    expect(getByText(mockProps.title ?? '')).toBeInTheDocument;
    expect(getByText(mockProps.description ?? '')).toBeInTheDocument;
  });
});
