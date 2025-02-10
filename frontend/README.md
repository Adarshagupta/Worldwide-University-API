# University API Client

A TypeScript/JavaScript client library for the Worldwide University API. This package provides a simple and type-safe way to interact with the University API.

## Installation

```bash
npm install university-api-client
# or
yarn add university-api-client
```

## Usage

```typescript
import { UniversityApiClient } from 'university-api-client';

// Initialize the client
const client = new UniversityApiClient();  // Uses the official API by default

// Or specify a custom URL
const customClient = new UniversityApiClient({
  baseUrl: 'your-custom-url/api',  // Optional, defaults to https://worldwide-university-api.onrender.com/api
  timeout: 5000  // Optional, defaults to 10000ms
});

// Get universities with filters
const universities = await client.getUniversities({
  country: 'United States',
  state: 'California',
  limit: 10
});

// Search universities
const searchResults = await client.searchUniversities({
  query: 'technology',
  limit: 5
});

// Get universities by country code
const usUniversities = await client.getUniversitiesByCountry('US');
```

## API Reference

### UniversityApiClient

#### Constructor
```typescript
new UniversityApiClient(config?: UniversityApiConfig)
```

Configuration options:
- `baseUrl`: API base URL (optional, default: 'https://worldwide-university-api.onrender.com/api')
- `timeout`: Request timeout in milliseconds (optional, default: 10000)

#### Methods

##### getUniversities
```typescript
getUniversities(filters?: UniversityFilters): Promise<University[]>
```

Filters:
- `country`: Filter by country name
- `state`: Filter by state/province
- `name`: Filter by university name
- `domain`: Filter by university domain
- `limit`: Number of results to return
- `offset`: Number of results to skip

##### getUniversitiesByCountry
```typescript
getUniversitiesByCountry(countryCode: string): Promise<University[]>
```

##### searchUniversities
```typescript
searchUniversities(options: SearchOptions): Promise<University[]>
```

Options:
- `query`: Search query string
- `limit`: Number of results to return (optional)

### Types

#### University
```typescript
interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  state_province: string;
}
```

## Live Demo

Try out the API directly at: [https://worldwide-university-api.onrender.com/](https://worldwide-university-api.onrender.com/)

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build the package:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## License

MIT License 