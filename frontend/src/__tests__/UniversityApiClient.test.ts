import axios from 'axios';
import { UniversityApiClient } from '../index';
import { University } from '../types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UniversityApiClient', () => {
  let client: UniversityApiClient;
  const mockUniversity: University = {
    name: 'Test University',
    domains: ['test.edu'],
    web_pages: ['http://test.edu'],
    country: 'Test Country',
    alpha_two_code: 'TC',
    state_province: 'Test State'
  };

  beforeEach(() => {
    client = new UniversityApiClient();
    // Reset axios mocks
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should use default baseUrl when no config provided', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://worldwide-university-api.onrender.com/api',
        timeout: 10000
      });
    });

    it('should use custom config when provided', () => {
      const customClient = new UniversityApiClient({
        baseUrl: 'https://custom-url.com',
        timeout: 5000
      });

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://custom-url.com',
        timeout: 5000
      });
    });
  });

  describe('getUniversities', () => {
    it('should fetch universities with no filters', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: [mockUniversity] })
      } as any);

      const result = await client.getUniversities();
      expect(result).toEqual([mockUniversity]);
    });

    it('should fetch universities with filters', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: [mockUniversity] })
      } as any);

      const filters = {
        country: 'Test Country',
        state: 'Test State',
        limit: 10
      };

      await client.getUniversities(filters);
      const mockGet = mockedAxios.create().get;
      expect(mockGet).toHaveBeenCalledWith('/universities', {
        params: expect.any(URLSearchParams)
      });
    });
  });

  describe('getUniversitiesByCountry', () => {
    it('should fetch universities by country code', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: [mockUniversity] })
      } as any);

      const result = await client.getUniversitiesByCountry('TC');
      expect(result).toEqual([mockUniversity]);
    });
  });

  describe('searchUniversities', () => {
    it('should search universities with query', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: [mockUniversity] })
      } as any);

      const result = await client.searchUniversities({ query: 'test' });
      expect(result).toEqual([mockUniversity]);
    });

    it('should include limit in search when provided', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: [mockUniversity] })
      } as any);

      await client.searchUniversities({ query: 'test', limit: 5 });
      const mockGet = mockedAxios.create().get;
      expect(mockGet).toHaveBeenCalledWith('/search', {
        params: expect.any(URLSearchParams)
      });
    });
  });
}); 