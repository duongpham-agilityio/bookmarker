import { act, fireEvent, render } from '@testing-library/react';

// Types
import { RecommendProps } from 'components/Form/Recommend';

// Components
import BookRecommend from 'components/Form/Recommend';

const setup = (props: RecommendProps) => render(<BookRecommend {...props} />);

describe('BookRecommend', () => {
  const mockProps: RecommendProps = {
    books: [
      {
        name: 'Book 1',
        description: 'Something description',
        imageURL:
          'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      {
        name: 'Book 2',
        description: 'Something description',
        imageURL:
          'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    ],
    onSelect: jest.fn(),
  };
  it('Match snapshot', () => {
    const { container } = setup(mockProps);

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    const { getByText } = setup(mockProps);
    const {
      books: [one],
      onSelect,
    } = mockProps;
    const item = getByText(one.name);

    act(() => {
      fireEvent.click(item);
    });

    expect(onSelect).toBeCalled();
  });
});
