import * as helpers from 'helpers';

jest.mock('helpers');

describe('Test fetcher', () => {
  it('Resolve', async () => {
    const mockData = {
      name: 'duong pham',
    };
    jest.spyOn(helpers, 'fetcher').mockResolvedValue(mockData);

    const res = await helpers.fetcher('user/1');

    expect(res).toEqual(mockData);
  });

  it('Reject', async () => {
    const mockData = {
      error: 'Something went wrong!!!',
    };
    jest.spyOn(helpers, 'fetcher').mockRejectedValue(mockData);

    await helpers
      .fetcher('user/1')
      .catch((err) => expect(err).toEqual(mockData));
  });
});
