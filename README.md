# Worldwide University API

A FastAPI-based REST API service that provides comprehensive information about universities worldwide. The API allows you to search and filter universities by various criteria including country, state/province, name, and domain.

## Features

- Search universities by name, domain, country, or state/province
- Filter universities by multiple criteria
- Get universities by country code
- Pagination support
- Modern web interface for API testing
- CORS enabled
- No rate limits
- Docker support

## API Endpoints

### 1. List Universities
```
GET /api/universities
```
Query Parameters:
- `country` (optional): Filter by country name
- `state` (optional): Filter by state/province
- `name` (optional): Filter by university name
- `domain` (optional): Filter by university domain
- `limit` (optional): Number of results to return
- `offset` (optional): Number of results to skip

### 2. Get Universities by Country Code
```
GET /api/universities/{country_code}
```
Returns all universities for a specific country using its two-letter country code.

### 3. Search Universities
```
GET /api/search
```
Query Parameters:
- `q`: Search query (searches across name, domain, country, and state/province)
- `limit` (optional): Number of results to return

## Setup

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/Adarshagupta/Worldwide-University-API.git
cd Worldwide-University-API
```

2. Build and run using Docker Compose:
```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`

To run in detached mode:
```bash
docker-compose up -d
```

To stop the service:
```bash
docker-compose down
```

### Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/Adarshagupta/Worldwide-University-API.git
cd Worldwide-University-API
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## Web Interface

A user-friendly web interface is available at the root URL (`http://localhost:8000`) for testing the API. Features include:
- Multiple search types
- Filter options
- Real-time API URL preview
- Formatted results display
- Error handling

## Response Format

All endpoints return data in the following format:
```json
[
  {
    "name": "University Name",
    "domains": ["domain1.edu", "domain2.edu"],
    "web_pages": ["http://www.university.edu"],
    "country": "Country Name",
    "alpha_two_code": "US",
    "state_province": "State Name"
  }
]
```

Note: If state/province information is not available, it will return "NA".

## Technologies Used

- FastAPI
- Python 3.9+
- HTML/CSS/JavaScript
- Uvicorn ASGI server
- Docker
- Docker Compose

## Development

### Running Tests
```bash
# TODO: Add testing instructions
```

### Docker Commands

Build the image:
```bash
docker build -t university-api .
```

Run the container:
```bash
docker run -p 8000:8000 university-api
```

## Contributing

Feel free to open issues and pull requests for any improvements.

## License

MIT License 