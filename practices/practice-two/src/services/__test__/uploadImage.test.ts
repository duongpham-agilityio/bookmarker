// Helpers
import * as helpers from 'helpers';

// Services
import { uploadImage } from 'services';

jest.mock('helpers');

describe('upload image service', () => {
  it('Resolve data', () => {
    jest.spyOn(helpers.axiosConfig, 'post').mockResolvedValue({
      data: {
        status: true,
      },
    });

    const formData = new FormData();
    formData.append('file', '123');
    uploadImage(formData, ({ status }: { [key: string]: any }) => {
      expect(status).toBeTruthy();
    });
  });

  it('Reject data', () => {
    jest
      .spyOn(helpers.axiosConfig, 'post')
      .mockRejectedValue({ data: { status: false } });

    const formData = new FormData();
    formData.append('file', '123');
    uploadImage(formData, ({ status }: { [key: string]: any }) => {
      expect(status).toBeFalsy();
    });
  });
});
