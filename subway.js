const searchInput = document.getElementById('station-search');
const searchResults = document.getElementById('search-results');
const stationResult = document.getElementById('station-result');

let selectedStation = null;

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.classList.remove('show');
        return;
    }
    
    // Filter stations based on search
    const matches = SUBWAY_STATIONS.filter(station => 
        station.Station.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 results
    
    if (matches.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item" style="color: #999;">No stations found</div>';
        searchResults.classList.add('show');
        return;
    }
    
    // Display results
    searchResults.innerHTML = matches.map(station => `
        <div class="search-result-item" data-station='${JSON.stringify(station)}'>
            <div class="result-station-name">${station.Station}</div>
        </div>
    `).join('');
    
    searchResults.classList.add('show');
    
    // Add click handlers
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const stationData = JSON.parse(item.dataset.station);
            displayStation(stationData);
            searchInput.value = stationData.Station;
            searchResults.classList.remove('show');
        });
    });
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('show');
    }
});

function displayStation(station) {
    selectedStation = station;
    
    // Show result container
    stationResult.style.display = 'block';
    
    // Set station name
    document.getElementById('station-name').textContent = station.Station;
    
    // Set precinct badge
    const precinct = station.Precinct || 'N/A';
    document.getElementById('station-precinct').textContent = `Precinct ${precinct}`;
    
    // Safety Index (inverted - lower is better, so we show 100 - value)
    const safetyIndex = parseFloat(station['total index']) || 0;
    const displaySafety = Math.round(100 - safetyIndex);
    document.getElementById('safety-score').textContent = displaySafety;
    document.getElementById('safety-fill').style.width = displaySafety + '%';
    document.getElementById('safety-desc').textContent = getSafetyDescription(displaySafety);
    
    // Crime Index
    const crimeIndex = parseFloat(station['Crime Index']) || 0;
    document.getElementById('crime-score').textContent = Math.round(crimeIndex);
    document.getElementById('crime-fill').style.width = crimeIndex + '%';
    document.getElementById('crime-desc').textContent = getCrimeDescription(crimeIndex);
    
    // Sketchy Index
    const sketchyIndex = parseInt(station['sketchy index']) || 0;
    document.getElementById('sketchy-score').textContent = sketchyIndex;
    document.getElementById('sketchy-fill').style.width = sketchyIndex + '%';
    document.getElementById('sketchy-desc').textContent = getSketchyDescription(sketchyIndex);
    
    // Additional info
    const ridership = station['Average Ridership'] || 0;
    document.getElementById('ridership').textContent = ridership > 0 
        ? ridership.toLocaleString() + ' passengers' 
        : 'N/A';
    document.getElementById('precinct-detail').textContent = precinct;
    
    // Scroll to results
    stationResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getSafetyDescription(score) {
    if (score >= 80) return 'Excellent - Very safe station';
    if (score >= 60) return 'Good - Generally safe';
    if (score >= 40) return 'Fair - Use caution, especially at night';
    if (score >= 20) return 'Below Average - Stay alert';
    return 'Poor - Exercise extra caution';
}

function getCrimeDescription(score) {
    if (score >= 80) return 'Higher crime incidence relative to other stations';
    if (score >= 60) return 'Moderate crime incidence';
    if (score >= 40) return 'Below average crime incidence';
    if (score >= 20) return 'Low crime incidence';
    return 'Very low crime incidence';
}

function getSketchyDescription(score) {
    if (score >= 80) return 'May feel uncomfortable, especially at night';
    if (score >= 60) return 'Some reports of feeling unsafe';
    if (score >= 40) return 'Generally comfortable during the day';
    if (score >= 20) return 'Feels safe most of the time';
    return 'Feels very safe';
}
