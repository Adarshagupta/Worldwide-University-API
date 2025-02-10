const API_BASE_URL = 'http://localhost:8000/api';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchType = document.getElementById('searchType');
    const filterOptions = document.querySelectorAll('.filter-option');
    const countryOption = document.querySelector('.country-option');
    const queryOption = document.querySelector('.query-option');

    // Handle search type changes
    searchType.addEventListener('change', () => {
        const selectedType = searchType.value;
        
        filterOptions.forEach(option => {
            option.style.display = selectedType === 'filter' ? 'block' : 'none';
        });
        
        countryOption.style.display = selectedType === 'country' ? 'block' : 'none';
        queryOption.style.display = selectedType === 'query' ? 'block' : 'none';
    });

    // Handle form submission
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(searchForm);
        const searchType = formData.get('searchType');
        const limit = formData.get('limit');
        
        let url = '';
        let queryParams = new URLSearchParams();
        
        switch (searchType) {
            case 'filter':
                url = `${API_BASE_URL}/universities`;
                const country = formData.get('country');
                const name = formData.get('name');
                const domain = formData.get('domain');
                const state = formData.get('state');
                
                if (country) queryParams.append('country', country);
                if (name) queryParams.append('name', name);
                if (domain) queryParams.append('domain', domain);
                if (state) queryParams.append('state', state);
                if (limit && limit.trim() !== '') queryParams.append('limit', limit);
                break;
                
            case 'country':
                const countryCode = formData.get('countryCode');
                url = `${API_BASE_URL}/universities/${countryCode}`;
                break;
                
            case 'query':
                url = `${API_BASE_URL}/search`;
                const query = formData.get('query');
                if (query) queryParams.append('q', query);
                if (limit && limit.trim() !== '') queryParams.append('limit', limit);
                break;
        }

        if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
        }

        // Display the API URL
        document.getElementById('apiUrl').innerHTML = `
            <strong>API URL:</strong> <a href="${url}" target="_blank" class="link">${url}</a>
        `;

        try {
            showLoading();
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || 'An error occurred while fetching data');
            }
            
            displayResults(data);
        } catch (error) {
            showError(error.message);
        } finally {
            hideLoading();
        }
    });
});

function displayResults(universities) {
    const resultsDiv = document.getElementById('results');
    
    if (!universities.length) {
        resultsDiv.innerHTML = '<p>No universities found matching your criteria.</p>';
        return;
    }
    
    const html = universities.map(uni => `
        <div class="university-card">
            <h2 class="university-name">${uni.name}</h2>
            <div class="university-details">
                <div class="detail-item">
                    <span class="detail-label">Country:</span>
                    <span>${uni.country} (${uni.alpha_two_code})</span>
                </div>
                ${uni.state_province ? `
                    <div class="detail-item">
                        <span class="detail-label">State/Province:</span>
                        <span>${uni.state_province}</span>
                    </div>
                ` : ''}
                <div class="detail-item">
                    <span class="detail-label">Domains:</span>
                    <span>${uni.domains.join(', ')}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Web Pages:</span>
                    <span>
                        ${uni.web_pages.map(url => `
                            <a href="${url}" target="_blank" class="link">${url}</a>
                        `).join(', ')}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    resultsDiv.innerHTML = html;
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('results').innerHTML = '';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    document.getElementById('results').innerHTML = '';
} 