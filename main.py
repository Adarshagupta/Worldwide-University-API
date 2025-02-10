import json
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(
    title="Universities API",
    description="API service for fetching university data worldwide",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for university
class University(BaseModel):
    name: str
    domains: List[str]
    web_pages: List[str]
    country: str
    alpha_two_code: str
    state_province: str = "NA"  # Default value changed to "NA"

# Load university data and process state/province
def load_university_data():
    with open("world_universities_and_domains.json", "r", encoding="utf-8") as f:
        data = json.load(f)
        processed_data = []
        # Process each university to ensure state_province is properly handled
        for uni in data:
            processed_uni = uni.copy()
            # Handle the state-province key
            state_province = uni.get("state-province")
            if state_province is None:
                processed_uni["state_province"] = "NA"
            else:
                processed_uni["state_province"] = state_province
                processed_uni.pop("state-province", None)
            processed_data.append(processed_uni)
        return processed_data

universities = []

@app.on_event("startup")
async def startup_event():
    global universities
    universities = load_university_data()

@app.get("/api/universities", response_model=List[University])
async def get_universities(
    country: Optional[str] = None,
    name: Optional[str] = None,
    domain: Optional[str] = None,
    state: Optional[str] = None,  # Added state filter
    limit: Optional[int] = None,
    offset: int = 0
):
    """
    Get universities with optional filters
    """
    filtered_unis = universities

    if country:
        filtered_unis = [u for u in filtered_unis if u["country"].lower() == country.lower()]
    
    if name:
        filtered_unis = [u for u in filtered_unis if name.lower() in u["name"].lower()]
    
    if domain:
        filtered_unis = [u for u in filtered_unis if any(domain.lower() in d.lower() for d in u["domains"])]

    if state:
        filtered_unis = [u for u in filtered_unis if u["state_province"].lower() == state.lower()]

    if limit:
        paginated_results = filtered_unis[offset:offset + limit]
    else:
        paginated_results = filtered_unis[offset:]

    if not paginated_results:
        raise HTTPException(status_code=404, detail="No universities found matching the criteria")

    return paginated_results

@app.get("/api/universities/{country_code}", response_model=List[University])
async def get_universities_by_country(country_code: str):
    """
    Get universities by country code (alpha-two code)
    """
    filtered_unis = [u for u in universities if u["alpha_two_code"].lower() == country_code.lower()]
    
    if not filtered_unis:
        raise HTTPException(status_code=404, detail=f"No universities found for country code: {country_code}")
    
    return filtered_unis

@app.get("/api/search", response_model=List[University])
async def search_universities(q: str, limit: Optional[int] = None):
    """
    Search universities by name, domain, country, or state/province
    """
    q = q.lower()
    results = [
        u for u in universities
        if q in u["name"].lower() or
           any(q in domain.lower() for domain in u["domains"]) or
           q in u["country"].lower() or
           q in u["state_province"].lower()
    ]

    if not results:
        raise HTTPException(status_code=404, detail="No universities found matching the search query")

    if limit:
        return results[:limit]
    return results

# Mount static files after API routes
app.mount("/", StaticFiles(directory="static", html=True), name="static") 