// Mocks
import 'components/__test__/mocks/image.test';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import FilterBar, { FilterBarProps } from 'pages/Home/FilterBar';

jest.mock('react-fast-compare', () => ({
  default: jest.fn(),
}));

const setup = (props: FilterBarProps) =>
  render(<FilterBar {...props} />, {
    wrapper: BrowserRouter,
  });

const defaultProps: FilterBarProps = {
  searchValue: '',
  sortOptions: [
    {
      href: '#one',
      isActive: false,
      title: 'One',
    },
    {
      href: '#two',
      isActive: false,
      title: 'Two',
    },
  ],
  onAddBook: jest.fn(),
  onChangeSearch: jest.fn(),
};

describe('Filter Bar', () => {
  it('Match to snapshot', () => {
    const { container } = setup(defaultProps);

    expect(container).toMatchSnapshot();
  });

  it('Match to snapshot', () => {
    const { rerender } = setup(defaultProps);

    rerender(<FilterBar {...defaultProps} searchValue="html" />);
  });
});
