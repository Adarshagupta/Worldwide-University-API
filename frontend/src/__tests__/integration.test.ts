import { UniversityApiClient } from '../index';

// Only run these tests if INTEGRATION_TEST environment variable is set
const runIntegrationTests = process.env.INTEGRATION_TEST === 'true';
(runIntegrationTests ? describe : describe.skip)('UniversityApiClient Integration Tests', () => {
  let client: UniversityApiClient;

  beforeAll(() => {
    client = new UniversityApiClient();
  });

  it('should fetch universities with no filters', async () => {
    const universities = await client.getUniversities();
    expect(Array.isArray(universities)).toBe(true);
    expect(universities.length).toBeGreaterThan(0);
    
    const university = universities[0];
    expect(university).toHaveProperty('name');
    expect(university).toHaveProperty('domains');
    expect(university).toHaveProperty('web_pages');
    expect(university).toHaveProperty('country');
    expect(university).toHaveProperty('alpha_two_code');
    expect(university).toHaveProperty('state_province');
  });

  it('should fetch universities with country filter', async () => {
    const universities = await client.getUniversities({ country: 'United States', limit: 5 });
    expect(Array.isArray(universities)).toBe(true);
    expect(universities.length).toBeLessThanOrEqual(5);
    
    universities.forEach(uni => {
      expect(uni.country).toBe('United States');
    });
  });

  it('should fetch universities by country code', async () => {
    const universities = await client.getUniversitiesByCountry('US');
    expect(Array.isArray(universities)).toBe(true);
    expect(universities.length).toBeGreaterThan(0);
    
    universities.forEach(uni => {
      expect(uni.alpha_two_code).toBe('US');
    });
  });

  it('should search universities', async () => {
    const universities = await client.searchUniversities({ query: 'Technology', limit: 5 });
    expect(Array.isArray(universities)).toBe(true);
    expect(universities.length).toBeLessThanOrEqual(5);
  });
}); 