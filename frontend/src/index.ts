import axios, { AxiosInstance } from 'axios';
import { University, UniversityFilters, SearchOptions, UniversityApiConfig } from './types';

export * from './types';

export class UniversityApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(config: UniversityApiConfig = {}) {
    this.baseUrl = config.baseUrl || 'https://worldwide-university-api.onrender.com/api';
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: config.timeout || 10000,
    });
  }

  /**
   * Get universities with optional filters
   */
  async getUniversities(filters?: UniversityFilters): Promise<University[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.client.get<University[]>('/universities', { params });
    return response.data;
  }

  /**
   * Get universities by country code
   */
  async getUniversitiesByCountry(countryCode: string): Promise<University[]> {
    const response = await this.client.get<University[]>(`/universities/${countryCode}`);
    return response.data;
  }

  /**
   * Search universities by query
   */
  async searchUniversities(options: SearchOptions): Promise<University[]> {
    const params = new URLSearchParams();
    params.append('q', options.query);
    
    if (options.limit !== undefined) {
      params.append('limit', options.limit.toString());
    }

    const response = await this.client.get<University[]>('/search', { params });
    return response.data;
  }
} 