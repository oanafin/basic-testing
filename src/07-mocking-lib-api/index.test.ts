import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  let axiosClientMock: AxiosInstance;

  beforeEach(() => {
    axiosClientMock = {
      defaults: {},
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      get: jest.fn(),
      delete: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      getUri: jest.fn(),
    } as unknown as AxiosInstance;

    mockedAxios.create.mockReturnValue(axiosClientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should perform request to correct provided url', async () => {
    jest.useFakeTimers();

    const relativePath = '/posts/1';
    const mockData = { id: 1, title: 'Test Title' };

    (axiosClientMock.get as jest.Mock).mockResolvedValueOnce({
      data: mockData,
    });

    throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(axiosClientMock.get).toHaveBeenCalledWith(relativePath);

    jest.useRealTimers();
  });
});
