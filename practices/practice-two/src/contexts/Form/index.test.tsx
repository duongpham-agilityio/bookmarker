import { render, act, fireEvent } from '@testing-library/react';
import { ReactNode, useContext } from 'react';

// Context
import { FormProvider } from 'contexts';
import { FormContext, StateType } from 'contexts/Form/context';

// Type
import { FormProps } from 'components/Form';

// Components
import * as components from 'components';

const mockDispatcher = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (state: StateType | undefined) => [state, mockDispatcher],
}));

// jest.mock('components', () => ({
//   ...jest.requireActual('components'),
//   Form: ({ onClose }: FormProps) => <button onClick={onClose}>Close</button>,
// }));

jest.spyOn(components, 'Form').getMockImplementation((props: FormProps) => (
  <>
    <button onClick={props.onClose}></button>
  </>
));

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

const data = {
  author: '',
  description: '',
  imageURL: '',
  name: '',
  publishDate: undefined,
  createdAt: 1680662612195,
  updatedAt: 1680662612195,
  deletedAt: 1680662612195,
};
const ChildrenTwo = () => {
  const { dispatch } = useContext(FormContext);

  return (
    <button
      onClick={() =>
        dispatch({
          formData: data,
          title: 'Create',
          type: 'create',
        })
      }
    >
      Click me
    </button>
  );
};

describe('FormContext', () => {
  it('action', () => {
    const { getByText, getAllByRole } = render(
      <FormProvider>
        <ChildrenTwo />
      </FormProvider>
    );

    const btn = getByText('Click me');

    act(() => {
      fireEvent.click(btn);
    });

    expect(mockDispatcher).toHaveBeenCalledWith({
      formData: data,
      title: 'Create',
      type: 'create',
    });

    const btns = getAllByRole('button');

    console.log(btns.length);
  });
});
