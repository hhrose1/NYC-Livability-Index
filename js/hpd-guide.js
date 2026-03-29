let currentFilter = 'all';
const searchInput = document.getElementById('code-search');
const violationsTable = document.getElementById('violations-table');
const resultsCount = document.getElementById('results-count');
const filterChips = document.querySelectorAll('.filter-chip');

// Filter chip handlers
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        // Update active state
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        // Update filter
        currentFilter = chip.dataset.class;
        
        // Re-render
        displayViolations(searchInput.value);
    });
});

// Search handler
searchInput.addEventListener('input', (e) => {
    displayViolations(e.target.value);
});

function displayViolations(searchQuery = '') {
    const query = searchQuery.toLowerCase().trim();
    
    // Filter violations
    let filtered = HPD_VIOLATIONS.filter(v => {
        // Apply class filter
        if (currentFilter !== 'all' && v.Class !== currentFilter) {
            return false;
        }
        
        // Apply search filter
        if (query) {
            const searchableText = `${v.Code} ${v['What It Means (Plain English)']} ${v.Class} ${v.Statute}`.toLowerCase();
            return searchableText.includes(query);
        }
        
        return true;
    });
    
    // Update count
    resultsCount.textContent = `Showing ${filtered.length} of ${HPD_VIOLATIONS.length} violation codes`;
    
    // Display results
    if (filtered.length === 0) {
        violationsTable.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div>No violation codes found</div>
            </div>
        `;
        return;
    }
    
    violationsTable.innerHTML = filtered.map(v => {
        const classLower = v.Class.toLowerCase();
        return `
            <div class="violation-row">
                <div class="violation-header">
                    <span class="violation-code">${v.Code}</span>
                    <span class="violation-class class-${classLower}">Class ${v.Class}</span>
                    <span class="violation-statute">${v.Statute}</span>
                </div>
                <div class="violation-description">${v['What It Means (Plain English)']}</div>
                <div class="violation-meta">
                    <span>⏱️ Correction time: ${v['Correction Time']}</span>
                    <span>⚖️ Penalty: ${v['Penalty if Not Fixed']}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Initial display - show all violations
displayViolations();
