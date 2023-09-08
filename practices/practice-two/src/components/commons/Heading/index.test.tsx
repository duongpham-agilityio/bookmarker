import { render } from '@testing-library/react';

// Component
import { Heading } from 'components/commons';

describe('Heading', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<Heading label="HTML/CSS" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('render', () => {
    const { getByText } = render(<Heading label="HTML/CSS" />);

    expect(getByText('HTML/CSS')).toBeInTheDocument();
  });
});
