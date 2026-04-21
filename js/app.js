// Check if coming from quick search on homepage
window.addEventListener('DOMContentLoaded', function() {
    const quickBudget = sessionStorage.getItem('quickSearchBudget');
    const quickPriority = sessionStorage.getItem('quickSearchPriority');
    
    if (quickBudget || quickPriority) {
        // Set budget
        if (quickBudget) {
            document.getElementById('budget').value = quickBudget;
        }
        
        // Set priority slider to 100, others to default
        if (quickPriority) {
            const priorityMap = {
                'safety': 'safety',
                'transit': 'transit',
                'affordability': 'affordability',
                'nightlife': 'nightlife',
                'walkability': 'walkability',
                'parks': 'parks'
            };
            
            const prioritySlider = priorityMap[quickPriority];
            if (prioritySlider) {
                document.getElementById(prioritySlider).value = 100;
                document.getElementById(prioritySlider + '-value').textContent = 100;
            }
        }
        
        // Clear session storage
        sessionStorage.removeItem('quickSearchBudget');
        sessionStorage.removeItem('quickSearchPriority');
        
        // Auto-run search
        setTimeout(() => {
            findNeighborhoods();
        }, 100);
    }
});

// Update slider value displays
document.querySelectorAll('input[type="range"]').forEach(slider => {
    if (!slider.classList.contains('weight-slider')) {
        slider.addEventListener('input', function() {
            document.getElementById(this.id + '-value').textContent = this.value;
        });
    }
});

function normalizeScore(value, min, max, reverse = false) {
    if (max === min) return 50;
    let normalized = ((value - min) / (max - min)) * 100;
    return reverse ? 100 - normalized : normalized;
}

function parseRent(rentRange) {
    if (!rentRange || rentRange === '') return null;
    if (typeof rentRange === 'number') return rentRange;
    
    // If it's a range like "3600-5200", take the minimum value
    const parts = rentRange.toString().split('-');
    return parseFloat(parts[0]);
}

function getBudgetPosition(budget, rentRange) {
    if (!budget || !rentRange) return null;
    
    const parts = rentRange.toString().split('-');
    if (parts.length !== 2) return null;
    
    const minRent = parseFloat(parts[0]);
    const maxRent = parseFloat(parts[1]);
    
    if (budget < minRent) return 'below';
    if (budget >= maxRent) return 'comfortable';
    
    const position = (budget - minRent) / (maxRent - minRent);
    if (position < 0.33) return 'low';
    if (position < 0.67) return 'mid';
    return 'high';
}

function findNeighborhoods() {
    const isAdvancedMode = document.getElementById('advanced-mode').style.display === 'block';
    
    let weights;
    
    if (isAdvancedMode) {
        // Use custom weights from advanced mode
        const rawWeights = {
            safety: parseInt(document.getElementById('weight-safety').value),
            transit: parseInt(document.getElementById('weight-transit').value),
            affordability: parseInt(document.getElementById('weight-affordability').value),
            nightlife: parseInt(document.getElementById('weight-nightlife').value),
            walkability: parseInt(document.getElementById('weight-walkability').value),
            schools: parseInt(document.getElementById('weight-schools').value),
            groceries: parseInt(document.getElementById('weight-groceries').value),
            parks: parseInt(document.getElementById('weight-parks').value)
        };
        
        // Normalize weights to sum to 1
        const total = Object.values(rawWeights).reduce((a, b) => a + b, 0);
        weights = {};
        for (let key in rawWeights) {
            weights[key] = total > 0 ? rawWeights[key] / total : 0.125;
        }
    } else {
        // Use simple mode - convert slider values to weights
        weights = {
            safety: parseInt(document.getElementById('safety').value) / 100,
            transit: parseInt(document.getElementById('transit').value) / 100,
            affordability: parseInt(document.getElementById('affordability').value) / 100,
            nightlife: parseInt(document.getElementById('nightlife').value) / 100,
            walkability: parseInt(document.getElementById('walkability').value) / 100,
            schools: parseInt(document.getElementById('schools').value) / 100,
            groceries: parseInt(document.getElementById('groceries').value) / 100,
            parks: parseInt(document.getElementById('parks').value) / 100
        };
    }

    const budget = document.getElementById('budget').value;
    const maxRent = budget ? parseFloat(budget) : Infinity;

    // Calculate min/max for normalization
    const rentValues = NEIGHBORHOODS.map(n => parseRent(n['Studio Rent Range'])).filter(r => r !== null && r > 0);
    const minRent = Math.min(...rentValues);
    const maxRent_data = Math.max(...rentValues);

    // Filter and score neighborhoods
    // Filter and score neighborhoods
    let scoredNeighborhoods = NEIGHBORHOODS
        .filter(n => {
            // Borough filter
            if (selectedBorough !== 'all' && n.Borough !== selectedBorough) {
                return false;
            }
            
            // Budget filter
            const rent = parseRent(n['Studio Rent Range']);
            if (!rent) return true;
            return rent <= maxRent;
        })
        .map(n => {
            const safetyScore = (n['Safety Score (/10)'] || 0) * 10;
            const transitScore = n['Transit Access Score'] || 0;
            
            const rent = parseRent(n['Studio Rent Range']);
            const affordabilityScore = rent ? normalizeScore(rent, minRent, maxRent_data, true) : 50;
            
            const nightlifeScore = (n['Nightlife/Social Score'] || 0) * 20;
            const walkabilityScore = n['Walk Score'] || 0;
            const schoolsScore = n['School Quality Score'] || 0;
            const groceriesScore = (n['Grocery Store Density'] || 0) * 20;
            const parksScore = (n['Park Access Score'] || 0) * 20;

            const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
            
            const matchScore = totalWeight > 0 ? (
                safetyScore * weights.safety +
                transitScore * weights.transit +
                affordabilityScore * weights.affordability +
                nightlifeScore * weights.nightlife +
                walkabilityScore * weights.walkability +
                schoolsScore * weights.schools +
                groceriesScore * weights.groceries +
                parksScore * weights.parks
            ) / totalWeight : 0;

            return {
                ...n,
                matchScore: Math.round(matchScore),
                budgetPosition: budget ? getBudgetPosition(parseFloat(budget), n['Studio Rent Range']) : null
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    displayResults(scoredNeighborhoods);
}

function displayResults(neighborhoods) {
    const resultsSection = document.getElementById('results-section');
    const cardsContainer = document.getElementById('cards-container');
    const resultsCount = document.getElementById('results-count');

    if (neighborhoods.length === 0) {
        resultsSection.style.display = 'none';
        return;
    }

    resultsSection.style.display = 'block';
    resultsCount.textContent = `${neighborhoods.length} neighborhoods found`;
    cardsContainer.innerHTML = '';

    const topResults = neighborhoods.slice(0, 20);

    topResults.forEach(n => {
        const card = document.createElement('a');
        card.className = 'neighborhood-card';
        card.href = `${n.Neighborhood.toLowerCase().replace(/\s+/g, '-')}.html`;

        // Safety badge
        const safetyScore = n['Safety Score (/10)'] || 0;
        let safetyClass = 'red';
        if (safetyScore >= 7) safetyClass = 'green';
        else if (safetyScore >= 5) safetyClass = 'yellow';

        // Rent display with budget position
        const rentRange = n['Studio Rent Range'] ? `$${n['Studio Rent Range']}` : 'N/A';
        let budgetIndicator = '';
        
        if (n.budgetPosition) {
            const indicators = {
                'comfortable': '<span class="budget-indicator comfortable">✓ Comfortable budget</span>',
                'high': '<span class="budget-indicator good">Good budget position</span>',
                'mid': '<span class="budget-indicator mid">Mid-range budget</span>',
                'low': '<span class="budget-indicator low">⚠ Lower end - expect trade-offs</span>',
                'below': '<span class="budget-indicator below">Below range minimum</span>'
            };
            budgetIndicator = indicators[n.budgetPosition] || '';
        }

        // Composite Livability Score
        const compositeScore = n['Composite Livability Score'] ? Math.round(n['Composite Livability Score']) : 'N/A';

        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="card-title">${n.Neighborhood}</div>
                    <div class="card-borough">${n.Borough}</div>
                </div>
                <div class="match-score">${n.matchScore}</div>
            </div>
            <div class="safety-badge ${safetyClass}">
                Safety: ${safetyScore}/10
            </div>
            <div class="card-stats">
                <div class="stat-row">
                    <span class="stat-label">Rent Range:</span>
                    <span class="stat-value">${rentRange}</span>
                </div>
                ${budgetIndicator}
                <div class="stat-row">
                    <span class="stat-label">Livability Index:</span>
                    <span class="stat-value">${compositeScore}/100</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Transit:</span>
                    <span class="stat-value">${n['Transit Access Score'] || 'N/A'}/100</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Walk Score:</span>
                    <span class="stat-value">${n['Walk Score'] || 'N/A'}</span>
                </div>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
}

function resetFilters() {
    document.getElementById('budget').value = '';
    
    // Reset simple mode sliders
    document.querySelectorAll('#simple-mode input[type="range"]').forEach(slider => {
        slider.value = 50;
        document.getElementById(slider.id + '-value').textContent = 50;
    });
    
    // Reset advanced mode weights
    const defaultWeights = {
        'weight-safety': 20,
        'weight-transit': 15,
        'weight-affordability': 15,
        'weight-nightlife': 10,
        'weight-walkability': 15,
        'weight-schools': 10,
        'weight-groceries': 10,
        'weight-parks': 5
    };
    
    for (let id in defaultWeights) {
        const slider = document.getElementById(id);
        if (slider) {
            slider.value = defaultWeights[id];
            document.getElementById(id + '-value').textContent = defaultWeights[id] + '%';
        }
    }
    
    document.getElementById('results-section').style.display = 'none';
}

// Borough filter
let selectedBorough = 'all';

document.querySelectorAll('.borough-chip').forEach(chip => {
    chip.addEventListener('click', function() {
        document.querySelectorAll('.borough-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        selectedBorough = this.dataset.borough;
    });
});
