export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  state_province: string;
}

export interface UniversityFilters {
  country?: string;
  name?: string;
  domain?: string;
  state?: string;
  limit?: number;
  offset?: number;
}

export interface SearchOptions {
  query: string;
  limit?: number;
}

export interface UniversityApiConfig {
  baseUrl?: string;
  timeout?: number;
} 