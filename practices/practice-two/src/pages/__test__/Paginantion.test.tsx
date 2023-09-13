// Mocks
import 'components/__test__/mocks/image.test';

import { fireEvent, render } from '@testing-library/react';

// COmponents
import Pagination, { PaginationProps } from 'pages/Home/Pagination';

const Component = (props: PaginationProps) => <Pagination {...props} />;

const setup = (props: PaginationProps) => render(<Component {...props} />);

jest.mock('react-fast-compare', () => ({
  default: jest.fn(),
}));

describe('Pagination', () => {
  it('Match to snapshot', () => {
    const { container } = setup({
      currentPage: 1,
      pagination: [0, 1, 2],
      onChangePage: jest.fn(),
    });

    expect(container).toMatchSnapshot();
  });

  it('Change pagination', () => {
    const changePage = jest.fn();
    const { rerender, getAllByRole } = setup({
      currentPage: 1,
      pagination: [0, 1, 2],
      onChangePage: changePage,
    });

    rerender(
      <Component
        {...{
          currentPage: 1,
          pagination: [0, 1, 2, 3],
          onChangePage: changePage,
        }}
      />
    );
    let buttons = getAllByRole('button');

    expect(buttons.length).toBe(4);

    rerender(
      <Component
        {...{
          currentPage: 1,
          pagination: [0, 1, 2, 3],
          onChangePage: changePage,
        }}
      />
    );

    buttons = getAllByRole('button');

    expect(buttons.length).toBe(4);

    fireEvent.click(buttons[1]);

    expect(changePage).toBeCalled();
  });
});
