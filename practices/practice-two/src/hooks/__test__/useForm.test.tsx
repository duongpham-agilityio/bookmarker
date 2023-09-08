import { ChangeEvent, FormEvent, ReactNode } from 'react';
import { act, renderHook, screen } from '@testing-library/react';

// Hooks
import { useForm } from 'hooks/useForm';

// Components
import * as components from 'components';

// Context
import { ToastProvider, FormProvider } from 'contexts';

// Types
import { Book } from 'types';

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <FormProvider>{children}</FormProvider>
    </ToastProvider>
  );
};

const initializeData: Omit<
  Book,
  'publishDate' | 'deletedAt' | 'createdAt' | 'updatedAt'
> & {
  publishDate?: number;
} = {
  author: '',
  description: '',
  imageURL: '',
  name: '',
  publishDate: undefined,
};
const initializeType: 'create' | 'update' = 'create';

const setup = () =>
  renderHook(() => useForm(initializeData, initializeType), {
    wrapper,
  });

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

describe('useForm', () => {
  it('render', () => {
    const { result } = setup();

    expect(result.current.value).toEqual({
      ...initializeData,
      publishDate: '',
      imageName: '',
    });
  });

  it('change value', async () => {
    const { result } = setup();

    await act(() => {
      const event = {
        target: {
          value: 'HTML',
          name: 'name',
        },
      } as ChangeEvent<HTMLInputElement>;

      result.current.onChange(event);
    });

    expect(result.current.value.name).toBe('HTML');
  });

  it('submit', () => {
    jest.spyOn(components, 'Notification').mockReturnValue(<p>Notification</p>);
    const { result } = setup();

    act(() => {
      const event = {
        preventDefault() {},
      } as FormEvent;
      result.current.onSubmit(event);
    });

    const element = screen.getByText(/Notification/i);

    expect(element).toBeInTheDocument();
  });
});
