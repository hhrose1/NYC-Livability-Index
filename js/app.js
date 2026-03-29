// Update slider value displays
document.querySelectorAll('input[type="range"]').forEach(slider => {
    const valueDisplay = document.getElementById(slider.id + '-value');
    slider.addEventListener('input', (e) => {
        valueDisplay.textContent = e.target.value;
    });
});

function resetFilters() {
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.value = 50;
        document.getElementById(slider.id + '-value').textContent = '50';
    });
    document.getElementById('budget').value = '';
    document.getElementById('results-section').style.display = 'none';
}

function normalizeScore(value, min, max, invert = false) {
    if (value === null || value === undefined || value === '') return 0;
    const normalized = (value - min) / (max - min) * 100;
    return invert ? 100 - normalized : normalized;
}

function findNeighborhoods() {
    const weights = {
        safety: parseInt(document.getElementById('safety').value) / 100,
        transit: parseInt(document.getElementById('transit').value) / 100,
        affordability: parseInt(document.getElementById('affordability').value) / 100,
        nightlife: parseInt(document.getElementById('nightlife').value) / 100,
        walkability: parseInt(document.getElementById('walkability').value) / 100,
        schools: parseInt(document.getElementById('schools').value) / 100,
        groceries: parseInt(document.getElementById('groceries').value) / 100,
        parks: parseInt(document.getElementById('parks').value) / 100
    };

    const budget = document.getElementById('budget').value;
    const maxRent = budget ? parseFloat(budget) : Infinity;

    // Calculate min/max for normalization
    const rentValues = NEIGHBORHOODS.map(n => n['Median Studio Rent']).filter(r => r > 0);
    const minRent = Math.min(...rentValues);
    const maxRent_data = Math.max(...rentValues);

    // Filter and score neighborhoods
    let scoredNeighborhoods = NEIGHBORHOODS
        .filter(n => {
            const rent = n['Median Studio Rent'] || 0;
            return rent === 0 || rent <= maxRent;
        })
        .map(n => {
            const safetyScore = (n['Safety Score (/10)'] || 0) * 10;
            const transitScore = n['Transit Access Score'] || 0;
            const affordabilityScore = normalizeScore(n['Median Studio Rent'] || maxRent_data, minRent, maxRent_data, true);
            const nightlifeScore = (n['Nightlife/Social Score'] || 0) * 20;
            const walkabilityScore = n['Walk Score'] || 0;
            const schoolsScore = n['School Quality Score'] || 0;
            const groceriesScore = (n['Grocery Store Density'] || 0) * 20;
            const parksScore = (n['Park Access Score'] || 0) * 20;

            const matchScore = (
                safetyScore * weights.safety +
                transitScore * weights.transit +
                affordabilityScore * weights.affordability +
                nightlifeScore * weights.nightlife +
                walkabilityScore * weights.walkability +
                schoolsScore * weights.schools +
                groceriesScore * weights.groceries +
                parksScore * weights.parks
            ) / Object.values(weights).reduce((a, b) => a + b, 0);

            return {
                ...n,
                matchScore: Math.round(matchScore)
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    displayResults(scoredNeighborhoods);
}

function displayResults(neighborhoods) {
    const resultsSection = document.getElementById('results-section');
    const cardsContainer = document.getElementById('cards-container');
    const resultsCount = document.getElementById('results-count');

    resultsSection.style.display = 'block';
    resultsCount.textContent = `(${neighborhoods.length} neighborhoods found)`;

    if (neighborhoods.length === 0) {
        cardsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No neighborhoods found</div>
                <div class="no-results-hint">Try adjusting your budget or priorities</div>
            </div>
        `;
        return;
    }

    cardsContainer.innerHTML = neighborhoods.slice(0, 20).map((n, index) => {
        const safetyClass = n['Map Color'] === 'Green' ? 'safety-green' : 
                           n['Map Color'] === 'Yellow' ? 'safety-yellow' : 'safety-red';
        const safetyLabel = n['Map Color'] === 'Green' ? '✓ Safe' : 
                           n['Map Color'] === 'Yellow' ? '⚠ Moderate' : '⚠ Caution';

        const rent = n['Median Studio Rent'] ? `$${n['Median Studio Rent'].toLocaleString()}` : 'N/A';
        const safetyScore = n['Safety Score (/10)'] ? n['Safety Score (/10)'].toFixed(1) : 'N/A';
        const transitScore = n['Transit Access Score'] || 'N/A';
        const walkScore = n['Walk Score'] || 'N/A';
        const nightlifeScore = n['Nightlife/Social Score'] || 'N/A';

const neighborhoodSlug = n['Neighborhood'].toLowerCase().replace(/[^a-z0-9]+/g, '-');
return `
    <div class="neighborhood-card" onclick="window.location.href='${neighborhoodSlug}.html'" style="cursor: pointer;">
                <div class="card-rank">${index + 1}</div>
                <div class="card-header">
                    <div class="card-title">${n['Neighborhood']}</div>
                    <div class="card-borough">${n['Borough']}</div>
                    <div class="safety-badge ${safetyClass}">${safetyLabel}</div>
                </div>
                <div class="card-stats">
                    <div class="stat-item">
                        <div class="stat-label">Rent</div>
                        <div class="stat-value">${rent}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Safety</div>
                        <div class="stat-value">${safetyScore}/10</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Transit</div>
                        <div class="stat-value">${transitScore}/100</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Walk Score</div>
                        <div class="stat-value">${walkScore}/100</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Nightlife</div>
                        <div class="stat-value">${nightlifeScore}/5</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Stations</div>
                        <div class="stat-value">${n['# Stations in Area']}</div>
                    </div>
                </div>
                <div class="match-score">
                    <div class="match-score-label">Match Score</div>
                    <div class="match-score-value">${n.matchScore}/100</div>
                </div>
            </div>
        `;
    }).join('');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initial state
resetFilters();
