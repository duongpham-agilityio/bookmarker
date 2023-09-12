import { act, fireEvent, render } from '@testing-library/react';
import React, { RefObject } from 'react';

// Hooks
import * as hooks from 'hooks';

// Mocks
import './mocks/button.test';
import './mocks/image.test';

// Components
import Form, { FormProps } from 'components/Form';

jest.mock('hooks');

const setup = (props: FormProps) => render(<Form {...props} />);

describe('Form component', () => {
  const onSubmit = jest.fn();
  const mockProps: FormProps = {
    onSubmit,
    value: {
      author: 'dddd',
      description:
        'LIFE Magazine is the treasured photographic magazine that chronicled the 20th Century. It now lives on at LIFE.com, the largest, most amazing collection of professional photography on the internet. Users can browse, search and view photos of today’s people and events. They have free access to share, print and post images for personal use.',
      imageURL:
        'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      name: 'LIFE23333',
      id: 16,
    },
  };
  const mockUseBookFormValue = {
    value: {
      author: 'dddd',
      description:
        'LIFE Magazine is the treasured photographic magazine that chronicled the 20th Century. It now lives on at LIFE.com, the largest, most amazing collection of professional photography on the internet. Users can browse, search and view photos of today’s people and events. They have free access to share, print and post images for personal use.',
      imageURL:
        'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      name: 'LIFE23333',
      id: 16,
      publishDate: '1955-08-15',
      imageName: 'duong',
    },
    isUpload: false,
    isSubmit: false,
    booksRecommended: [],
    handleSelectRecommended: jest.fn(),
    resetRecommended: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    refImage: {
      current: null,
    },
  };

  it('Match snapshot', () => {
    jest.spyOn(hooks, 'useBookForm').mockReturnValue(mockUseBookFormValue);

    const { container } = setup(mockProps);

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: document.createElement('input'),
    });
    jest.spyOn(hooks, 'useBookForm').mockReturnValue({
      ...mockUseBookFormValue,
      booksRecommended: [
        {
          description:
            'LIFE Magazine is the treasured photographic magazine that chronicled the 20th Century. It now lives on at LIFE.com, the largest, most amazing collection of professional photography on the internet. Users can browse, search and view photos of today’s people and events. They have free access to share, print and post images for personal use.',
          imageURL:
            'http://books.google.com/books/content?id=51YEAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          name: 'LIFE23333',
        },
      ],
      value: {
        ...mockUseBookFormValue.value,
        imageName: '',
      },
      refImage: useRefSpy,
    });
    const { getByText, getByTestId } = setup(mockProps);

    const button = getByText('Upload');
    const formEl = getByTestId('book-form');

    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      fireEvent.click(formEl);
    });
  });
});