// Types
import { ButtonProps } from 'components/commons';

jest.mock('components/commons/Button', () => ({
  default: ({ onClick }: ButtonProps) => (
    <button onClick={onClick}>Icon</button>
  ),
}));

test('mock button', () => {});

export {};
