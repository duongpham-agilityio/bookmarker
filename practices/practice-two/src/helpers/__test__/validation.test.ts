import { validate } from 'helpers';

describe('Validator', () => {
  it('should validate success', () => {
    const object = {
      name: 'duong.pham',
    };
    const isError = validate(object);

    expect(isError).toBeFalsy();
  });

  it('should validate error', () => {
    const object = {
      name: '',
    };
    const isError = validate(object);

    expect(isError).toBeTruthy();
  });
});
