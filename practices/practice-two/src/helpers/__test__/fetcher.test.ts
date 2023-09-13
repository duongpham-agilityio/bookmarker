import * as helpers from 'helpers';

describe('Test fetcher', () => {
  it('Resolve', async () => {
    const mockData = {
      name: 'duong pham',
    };

    jest
      .spyOn(helpers.axiosConfig, 'get')
      .mockImplementation(jest.fn().mockResolvedValue({ data: mockData }));
    const res = await helpers.fetcher('user/1');

    expect(res).toEqual(mockData);
  });

  it('Reject', async () => {
    const mockData = {
      error: 'Something went wrong!!!',
    };
    jest.spyOn(helpers.axiosConfig, 'get').mockRejectedValue(mockData);

    await helpers
      .fetcher('user/1')
      .catch((err) => expect(err).toEqual(mockData));
  });
});
