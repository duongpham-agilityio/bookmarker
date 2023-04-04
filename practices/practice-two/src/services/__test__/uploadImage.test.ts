import { uploadImage } from 'services';
import { axiosConfig } from 'helpers'; // You may have to modify this import path if it's incorrect.

describe('uploadImage', () => {
  it('resolves', async () => {
    const formData = new FormData();
    const mockCallBack = jest.fn();
    const resolves = {
      success: true,
    };
    jest.spyOn(axiosConfig, 'post').mockResolvedValue({
      data: resolves,
    });

    formData.append('file', 'test.jpg');
    await uploadImage(formData, mockCallBack);

    expect(mockCallBack).toHaveBeenCalledWith(resolves);
  });

  it('rejects', async () => {
    const formData = new FormData();
    const mockCallBack = jest.fn();
    const rejects = {
      success: false,
    };
    jest.spyOn(axiosConfig, 'post').mockResolvedValue({
      data: rejects,
    });

    formData.append('file', 'test.jpg');
    await uploadImage(formData, mockCallBack);

    expect(mockCallBack).toHaveBeenCalledWith(rejects);
  });
});
