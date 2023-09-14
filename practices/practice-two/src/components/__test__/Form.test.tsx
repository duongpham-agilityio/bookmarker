import { fireEvent, render } from '@testing-library/react';

// Hooks
import * as hooks from 'hooks';

// Mocks
import './mocks/image.test';

// Components
import Form, { FormProps } from 'components/Form';
import { RefObject } from 'react';

jest.mock('hooks');

const setup = (props: FormProps) => render(<Form {...props} />);

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
const mockUseBookFormValue: ReturnType<typeof hooks.useBookForm> = {
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
    current: {
      click: null,
    },
  } as unknown as RefObject<HTMLInputElement>,
};

describe('Form component', () => {
  it('Match snapshot', () => {
    jest.spyOn(hooks, 'useBookForm').mockReturnValue(mockUseBookFormValue);

    const { container } = setup(mockProps);

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    jest.spyOn(hooks, 'useBookForm').mockReturnValue({
      ...mockUseBookFormValue,
      isUpload: true,
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
        imageURL: '',
      },
      refImage: {
        current: {
          click: jest.fn(),
        },
      } as unknown as RefObject<HTMLInputElement>,
    });
    const { getByTestId } = setup(mockProps);

    const formEl = getByTestId('book-form');

    fireEvent.click(formEl);

    expect(mockUseBookFormValue.resetRecommended).toBeCalled();
  });

  it('Choose image', () => {
    const chooseImage = jest.fn();

    jest.spyOn(hooks, 'useBookForm').mockReturnValue({
      ...mockUseBookFormValue,
      isUpload: false,
      booksRecommended: [],
      value: {
        ...mockUseBookFormValue.value,
        imageName: '',
      },
      refImage: {
        current: {
          click: chooseImage,
        },
      } as unknown as RefObject<HTMLInputElement>,
    });

    const { getByTestId } = setup(mockProps);
    const uploadBtn = getByTestId('upload-btn');

    fireEvent.click(uploadBtn);

    expect(chooseImage).toHaveBeenCalledTimes(1);
  });
});
