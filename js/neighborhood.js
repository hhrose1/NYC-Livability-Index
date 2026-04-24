/**
 * neighborhood.js — Dynamic Neighborhood Page Logic
 * NYC Livability Index
 *
 * Reads ?slug=... from URL, finds data, populates ALL content dynamically.
 */

import { neighborhoods, DATA_LAST_UPDATED } from '../data/neighborhoods.js';
import { neighborhoodContent } from '../data/neighborhood-content.js';

// Lazy-load subway stations only on this page
let subwayStations = null;
async function loadSubwayStations() {
  if (subwayStations) return subwayStations;
  const mod = await import('../data/subway-stations.js');
  subwayStations = mod.subwayStations;
  return subwayStations;
}

// ── Slug from URL ──────────────────────────────────────────────
function getSlug() {
  return new URLSearchParams(window.location.search).get('slug') || '';
}

// ── Favorites ──────────────────────────────────────────────────
function getFavs() {
  try { return JSON.parse(localStorage.getItem('nyc_favorites') || '[]'); } catch { return []; }
}
function saveFavs(f) {
  try { localStorage.setItem('nyc_favorites', JSON.stringify(f)); } catch {}
}

// ── Render helpers ─────────────────────────────────────────────
function set(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

function safetyClass(score) {
  if (score >= 70) return 'green';
  if (score >= 50) return 'yellow';
  return 'red';
}
function safetyLabel(score) {
  if (score >= 70) return '✓ Safe';
  if (score >= 50) return '⚠ Caution';
  return '✗ Alert';
}

function scoreBar(score) {
  const pct = Math.round(Math.max(0, Math.min(100, score || 0)));
  return `<div class="score-bar-bg"><div class="score-bar-fill" style="width:${pct}%"></div></div>`;
}

function formatRent(range) {
  if (!range || range === '') return 'N/A';
  const parts = range.split('-');
  return parts.map(p => '$' + Number(p.trim()).toLocaleString()).join(' – ');
}

// ── Stats grid helper ──────────────────────────────────────────
function renderStatsGrid(n) {
  const statCards = [
    { icon: '🏠', label: 'Studio Rent', value: formatRent(n.studioRentRange) },
    { icon: '🚇', label: 'Transit Score', value: n.transitScore != null ? `${n.transitScore}/100` : 'N/A' },
    { icon: '🚶', label: 'Walk Score', value: n.walkScore != null ? `${n.walkScore}/100` : 'N/A' },
    { icon: '🚲', label: 'Bike Score', value: n.bikeScore != null ? `${n.bikeScore}/100` : 'N/A' },
    { icon: '🏫', label: 'School Quality', value: n.schoolScore != null ? `${Math.round(n.schoolScore)}/100` : 'N/A' },
    { icon: '🎉', label: 'Nightlife', value: n.nightlifeScore != null ? `${n.nightlifeScore}/100` : 'N/A' },
    { icon: '🛒', label: 'Grocery Access', value: n.groceryScore != null ? `${n.groceryScore}/100` : 'N/A' },
    { icon: '🌳', label: 'Park Access', value: n.parkScore != null ? `${n.parkScore}/100` : 'N/A' },
  ];
  set('stats-grid', statCards.map(c => `
    <div class="stat-card">
      <div class="stat-icon">${c.icon}</div>
      <div class="stat-label">${c.label}</div>
      <div class="stat-value">${c.value}</div>
    </div>`).join(''));
}

// ── Magazine layout ────────────────────────────────────────────
function scoreRow(label, value) {
  return `<div class="mg-score-row"><span class="mg-score-label">${label}</span><span class="mg-score-value">${value ?? '—'}</span></div>`;
}

function mgRentRows(n) {
  const rows = [];
  if (n.studioRentRange) rows.push(scoreRow('Studio', formatRent(n.studioRentRange)));
  if (n.rent1BR) rows.push(scoreRow('1 Bedroom', formatRent(n.rent1BR)));
  if (n.rent2BR) rows.push(scoreRow('2 Bedroom', formatRent(n.rent2BR)));
  return rows.join('');
}

function renderMagazineLayout(n, content, stations = []) {
  const livScore  = n.livabilityScore != null ? Math.round(n.livabilityScore)  : '—';
  const safScore  = n.safetyScore     != null ? Math.round(n.safetyScore)      : '—';
  const trnScore  = n.transitScore    != null ? Math.round(n.transitScore)     : '—';
  const sktScore  = n.subwaySketchyIndex != null ? Math.round(n.subwaySketchyIndex) : '—';

  const grid = document.createElement('div');
  grid.className = 'magazine-grid';
  grid.innerHTML = `
    <!-- Row 1: Image | Heading -->
    <div class="mg-cell mg-image">
      <img id="mg-img1" class="mg-img" src="${content.img1}" alt="${n.name}" loading="eager" crossorigin="anonymous">
    </div>
    <div class="mg-cell mg-heading" id="mg-heading">
      <div class="mg-heading-inner">
        <div class="mg-nbhd-name">${n.name}</div>
        <div class="mg-nbhd-borough">${n.borough}, New York City</div>
        <div class="mg-score-chips">
          <span class="mg-chip">Livability ${livScore}</span>
          <span class="mg-chip">Safety ${safScore}</span>
          <span class="mg-chip">Transit ${trnScore}</span>
        </div>
      </div>
    </div>

    <!-- Row 2: Marketing Copy | Image -->
    <div class="mg-cell mg-text">
      <p>${content.blurbLeft}</p>
    </div>
    <div class="mg-cell mg-image">
      <img class="mg-img" src="${content.img2}" alt="${n.name} neighborhood" loading="lazy">
    </div>

    <!-- Row 3: Image | Key Stats -->
    <div class="mg-cell mg-image">
      <img class="mg-img" src="${content.img3}" alt="${n.name} homes" loading="lazy">
    </div>
    <div class="mg-cell mg-stats">
      <h3>Key Scores</h3>
      <div class="mg-scores-primary">
        ${scoreRow('Livability', livScore + '/100')}
        ${scoreRow('Safety', safScore + '/100')}
        ${scoreRow('Transit', trnScore + '/100')}
        ${scoreRow('Subway Sketchy Index', sktScore + '/100')}
      </div>
      <div class="mg-scores-secondary">
        ${scoreRow('Walk Score', n.walkScore != null ? n.walkScore + '/100' : null)}
        ${scoreRow('Bike Score', n.bikeScore != null ? n.bikeScore + '/100' : null)}
        ${scoreRow('School Quality', n.schoolScore != null ? Math.round(n.schoolScore) + '/100' : null)}
        ${scoreRow('Nightlife', n.nightlifeScore != null ? n.nightlifeScore + '/100' : null)}
        ${scoreRow('Grocery Access', n.groceryScore != null ? n.groceryScore + '/100' : null)}
        ${scoreRow('Park Access', n.parkScore != null ? n.parkScore + '/100' : null)}
      </div>
    </div>

    <!-- Row 4: Rent & Subway | Image -->
    <div class="mg-cell mg-text">
      <h3>Rent &amp; Transit</h3>
      <div class="mg-subsection-label">Typical Rent Ranges</div>
      ${mgRentRows(n)}
      ${n.studioRentRange || n.rent1BR ? '' : '<p style="color:var(--color-text-muted);font-style:italic">Rent data coming soon</p>'}
      ${stations.length > 0 ? `
      <div class="mg-subsection-label" style="margin-top:14px">Nearby Subway Stations</div>
      ${stations.map(s => {
        const score = s['sketchy index'] || 0;
        const risk = score > 70 ? 'High Risk' : score > 40 ? 'Moderate' : 'Low Risk';
        const riskColor = score > 70 ? '#e74c3c' : score > 40 ? '#f39c12' : '#27ae60';
        return `<div class="mg-score-row"><span class="mg-score-label" style="font-size:0.82rem">${s.Station}</span><span class="mg-score-value" style="color:${riskColor};font-size:0.78rem">${risk}</span></div>`;
      }).join('')}` : ''}
    </div>
    <div class="mg-cell mg-image">
      <img class="mg-img" src="${content.img4}" alt="${n.name} subway" loading="lazy">
    </div>

    <!-- Row 5: Image | Demographics -->
    <div class="mg-cell mg-image">
      <img class="mg-img" src="${content.img5}" alt="${n.name} community" loading="lazy">
    </div>
    <div class="mg-cell mg-text">
      <h3>Who Lives Here</h3>
      <p>${content.blurbRight}</p>
    </div>
  `;

  const container = document.getElementById('magazine-container');
  container.innerHTML = '';
  container.appendChild(grid);
  container.style.display = '';

  // Sample color from img1 for the heading background
  const img1El = grid.querySelector('#mg-img1');
  const headingEl = grid.querySelector('#mg-heading');
  img1El.addEventListener('load', () => {
    const color = sampleImageEdgeColor(img1El) || 'var(--color-primary)';
    headingEl.style.backgroundColor = color;
    const luminance = getColorLuminance(color);
    headingEl.style.color = luminance > 0.4 ? '#1a1a2e' : '#ffffff';
    headingEl.querySelectorAll('.mg-chip').forEach(c => {
      c.style.borderColor = luminance > 0.4 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)';
      c.style.color = luminance > 0.4 ? '#1a1a2e' : '#ffffff';
    });
  });
  img1El.addEventListener('error', () => {
    img1El.src = `https://picsum.photos/seed/${n.slug}/800/600`;
  });
}

function sampleImageEdgeColor(imgEl) {
  try {
    const canvas = document.createElement('canvas');
    const size = 20;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    // Sample from the right edge of the image (where it meets the heading)
    const sx = Math.max(0, imgEl.naturalWidth - Math.round(imgEl.naturalWidth * 0.25));
    const sw = imgEl.naturalWidth - sx;
    ctx.drawImage(imgEl, sx, 0, sw, imgEl.naturalHeight, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i+1]; b += data[i+2]; }
    const px = data.length / 4;
    return `rgb(${Math.round(r/px)},${Math.round(g/px)},${Math.round(b/px)})`;
  } catch {
    return null;
  }
}

function getColorLuminance(colorStr) {
  const m = colorStr.match(/\d+/g);
  if (!m || m.length < 3) return 0;
  const [r, g, b] = m.map(Number);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// ── Main render ────────────────────────────────────────────────
async function render() {
  const slug = getSlug();
  if (!slug) {
    document.title = 'Neighborhood Not Found — NYC Livability Index';
    set('nbhd-content', '<div class="page-content"><p>No neighborhood specified. <a href="search.html">Back to search</a></p></div>');
    return;
  }

  const n = neighborhoods.find(x => x.slug === slug);
  if (!n) {
    document.title = 'Not Found — NYC Livability Index';
    set('nbhd-content', `<div class="page-content"><p>Neighborhood "${slug}" not found. <a href="search.html">Back to search</a></p></div>`);
    return;
  }

  // ── SEO / Meta ──────────────────────────────────────────────
  document.title = `${n.name} - NYC Livability Index`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',
    `Is ${n.name} safe? Crime rates, rent prices, subway access, and livability score for this ${n.borough} neighborhood.`);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href',
    `${location.origin}${location.pathname}?slug=${slug}`);

  // JSON-LD structured data
  const ld = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": n.name,
    "description": `${n.name} neighborhood in ${n.borough}, New York City`,
    "containedInPlace": { "@type": "City", "name": "New York City" }
  };
  let ldEl = document.getElementById('json-ld');
  if (!ldEl) { ldEl = document.createElement('script'); ldEl.id = 'json-ld'; ldEl.type = 'application/ld+json'; document.head.appendChild(ldEl); }
  ldEl.textContent = JSON.stringify(ld);

  // ── Back link ───────────────────────────────────────────────
  const backHref = sessionStorage.getItem('searchReturnUrl') || 'search.html';
  set('back-link', `<a href="${backHref}" class="back-link">← Back to Results</a>`);

  // ── Hero ────────────────────────────────────────────────────
  const livScore = n.livabilityScore ? Math.round(n.livabilityScore) : '—';
  const safeScore = n.safetyScore != null ? Math.round(n.safetyScore) : '—';
  setText('nbhd-name', n.name);
  setText('nbhd-borough', n.borough);
  set('nbhd-livability', `
    <div class="score-pill">
      <span class="score-pill-value">${livScore}</span>
      <span class="score-pill-label">Livability
        <span class="tooltip-wrap">
          <span class="tooltip-icon">?</span>
          <span class="tooltip-text">Composite Livability Score (0–100): Weighted combination of Safety (30%), Transit Access (20%), Walk Score (15%), Restaurant Density (10%), Nightlife (10%), School Quality (5%), and Amenities — medical, grocery, parks (10% combined). Affordability is excluded so you can filter by budget and rank by quality separately.</span>
        </span>
      </span>
    </div>
    <div class="score-pill">
      <span class="score-pill-value">${safeScore}</span>
      <span class="score-pill-label">Safety
        <span class="tooltip-wrap">
          <span class="tooltip-icon">?</span>
          <span class="tooltip-text">Neighborhood Safety Score (0–10 scale, shown here /100): Crime per 1k residents (60%), transit crime per 1k (20%), avg Subway Sketchy Index (20%). Manhattan below 110th St and Downtown Brooklyn use ambient/daytime population instead of residential to avoid skewing scores in high-commuter areas.</span>
        </span>
      </span>
    </div>`);

  // ── Flood Zone Banner ───────────────────────────────────────
  if (n.floodZone) {
    show('flood-banner');
  } else {
    hide('flood-banner');
  }

  // ── Safety Banner ───────────────────────────────────────────
  const sc = safetyClass(n.safetyScore || 0);
  const sl = safetyLabel(n.safetyScore || 0);
  const sb = document.getElementById('safety-banner');
  if (sb) {
    sb.className = `safety-banner ${sc}`;
    sb.innerHTML = `
      <span class="safety-icon">${sc === 'green' ? '✅' : sc === 'yellow' ? '⚠️' : '🚨'}</span>
      <span class="safety-text">${sl}</span>
      <span class="safety-score-badge">Safety: ${safeScore}/100</span>`;
  }

  // ── Rent Table ──────────────────────────────────────────────
  if (n.studioRentRange || n.rent1BR || n.rent2BR) {
    show('rent-section');
    set('rent-table-body', `
      <tr><td>Studio</td><td class="rent-val">${formatRent(n.studioRentRange)}</td></tr>
      <tr><td>1 Bedroom</td><td class="rent-val">${formatRent(n.rent1BR)}</td></tr>
      <tr><td>2 Bedroom</td><td class="rent-val">${formatRent(n.rent2BR)}</td></tr>`);
  }

  // ── Commute Times ───────────────────────────────────────────
  if (n.commuteTimes) {
    show('commute-section');
    const dests = [
      { key: 'midtown', label: 'Midtown', icon: '🏙️' },
      { key: 'fidi', label: 'FiDi', icon: '💼' },
      { key: 'downtownBklyn', label: 'Dwtn Bklyn', icon: '🌉' },
      { key: 'lic', label: 'LIC', icon: '🏗️' },
      { key: 'jfk', label: 'JFK Airport', icon: '✈️' },
    ];
    set('commute-grid', dests.map(d => {
      const min = n.commuteTimes[d.key];
      return `<div class="commute-card">
        <div class="dest">${d.icon} ${d.label}</div>
        <div class="time">${min ?? '—'}</div>
        <div class="time-label">min avg</div>
      </div>`;
    }).join(''));
    set('commute-note', '<p class="commute-note">// TODO: Replace with real MTA data. Current values are estimates.</p>');
  }

  // ── Noise Complaints ─────────────────────────────────────────
  if (n.noiseComplaintsPer1000 != null) {
    show('noise-section');
    set('noise-value', `${n.noiseComplaintsPer1000} per 1,000 residents (2025) <span style="font-size:0.7em;color:var(--color-text-muted)">// TODO: NYC Open Data 311 API</span>`);
  }

  // ── Scores Display ──────────────────────────────────────────
  set('livability-display', `
    <div class="score-display">
      <div class="score-num">${livScore}<small>/100</small></div>
      <div class="score-bar-wrap">${scoreBar(n.livabilityScore)}</div>
    </div>
    <p class="methodology-note">Methodology coming soon
      <span class="tooltip-wrap">
        <span class="tooltip-icon">?</span>
        <span class="tooltip-text">Composite Livability Score (0–100): Safety 30%, Transit 20%, Walk Score 15%, Restaurant Density 10%, Nightlife 10%, Schools 5%, Amenities (medical + grocery + parks) 10%. Does not include affordability — budget is filtered separately.</span>
      </span>
    </p>`);

  set('sketchy-display', `
    <div class="score-display">
      <div class="score-num">${n.subwaySketchyIndex != null ? Math.round(n.subwaySketchyIndex) : '—'}<small>/100</small></div>
      <div class="score-bar-wrap">${scoreBar(n.subwaySketchyIndex)}</div>
    </div>
    <p class="methodology-note">Methodology: [To be provided]
      <span class="tooltip-wrap">
        <span class="tooltip-icon">?</span>
        <span class="tooltip-text">Subway Sketchy Index (0–100): Weighted score for each station — Precinct crime per 1k residents (45%), NYCHA proximity within 2 blocks (25%), qualitative sketchy mentions from Reddit/local news (15%), ridership rank (15%). Green = safest third, Yellow = middle third, Red = top-concern third. Yellow/red reflects relative ranking, not a guarantee of danger.</span>
      </span>
    </p>`);

  // ── Subway Stations ──────────────────────────────────────────
  let nearbyStations = [];
  try {
    const stations = await loadSubwayStations();
    // Match stations by precinct number
    const precinct = n.precinct;
    const nearby = stations.filter(s => s.Precinct === precinct).slice(0, 10);
    nearbyStations = nearby;

    if (nearby.length > 0) {
      show('stations-section');
      // High-risk stations (sketchy index > 70 on 0-100 scale, or > 7 on old 0-10 interpreation)
      const highRisk = nearby.filter(s => (s['sketchy index'] || 0) > 70);
      if (highRisk.length > 0) {
        show('high-risk-box');
        set('high-risk-list', highRisk.map(s => `
          <li class="station-item">
            <span class="station-name">${s.Station}</span>
            <span class="station-score high">Sketchy: ${Math.round(s['sketchy index'])}</span>
          </li>`).join(''));
      }

      // ADA accessible stations
      const adaStations = nearby.filter(s => s.hasElevator);
      set('ada-stations', adaStations.length > 0
        ? `<ul class="stations-list">${adaStations.map(s => `<li class="station-item"><span class="station-name">♿ ${s.Station}</span><span class="station-ada">Accessible</span></li>`).join('')}</ul>`
        : '<p style="color:var(--color-text-muted);font-size:0.875rem">No confirmed accessible stations nearby. <!-- TODO: Replace with MTA ADA API --></p>');

      set('stations-list', nearby.map(s => {
        const score = s['sketchy index'] || 0;
        const cls = score > 70 ? 'high' : score > 40 ? 'ok' : 'good';
        const totalIdx = Math.round(s['total index'] || 0);
        return `<li class="station-item">
          <span class="station-name">${s.Station}</span>
          <span class="station-score ${cls}">Risk: ${totalIdx}</span>
          ${s.hasElevator ? '<span class="station-ada">♿</span>' : ''}
        </li>`;
      }).join(''));
    }
  } catch (e) {
    console.error('[Stations]', e);
  }

  // ── Favorites button ─────────────────────────────────────────
  const favBtn = document.getElementById('fav-btn');
  if (favBtn) {
    const updateFavBtn = () => {
      const isFav = getFavs().includes(slug);
      favBtn.textContent = isFav ? '★ Saved to Favorites' : '☆ Save to Favorites';
      favBtn.classList.toggle('active', isFav);
    };
    updateFavBtn();
    favBtn.addEventListener('click', () => {
      const favs = getFavs();
      const idx = favs.indexOf(slug);
      if (idx >= 0) favs.splice(idx, 1); else favs.push(slug);
      saveFavs(favs);
      updateFavBtn();
      // Update nav count
      updateFavCount();
    });
  }

  // ── Magazine Layout (when CSV content exists) ─────────────────
  const content = neighborhoodContent[slug];
  if (content) {
    renderMagazineLayout(n, content, nearbyStations);
    hide('collage-section');
    hide('narrative-section');
    hide('keystats-section');
    hide('rent-section');
    hide('commute-section');
    hide('scores-section');
    hide('noise-section');
    hide('stations-section');
    hide('local-guides-section');
    hide('demographics-section');
  } else {
    hide('magazine-container');
    // Fallback: photo collage
    set('photo-collage', Array.from({length: 6}, (_, i) =>
      `<img src="https://picsum.photos/seed/${n.slug}${i}/400/300" alt="${n.name} photo ${i+1}" loading="lazy">`
    ).join(''));
    // Fallback: narrative
    const vibe = n.nightlifeScore > 70 ? 'vibrant nightlife scene'
      : n.parkScore > 70 ? 'strong access to green space'
      : n.walkScore > 85 ? 'excellent walkability'
      : 'strong sense of community';
    set('nbhd-narrative', `${n.name} is a ${n.borough} neighborhood known for its ${vibe}.
      ${n.safetyScore >= 70 ? 'It\'s considered one of the safer areas in its borough.' : ''}
      ${n.livabilityScore >= 80 ? 'With a high livability score, it\'s a popular choice for new residents.' : ''}
      <em style="color:var(--color-text-muted);font-size:0.85em"> — Placeholder narrative; curated content coming soon.</em>`);
    // Fallback: stats grid
    renderStatsGrid(n);
  }

  // ── Demographics (fallback for non-magazine neighborhoods) ────
  if (!neighborhoodContent[slug] && n.medianIncome) {
    show('demographics-section');
    const incomeFormatted = '$' + Number(n.medianIncome).toLocaleString();
    set('demographics-content', `
      <div class="data-row"><span class="data-row-label">Median Household Income</span>
        <span class="data-row-value">${incomeFormatted}</span></div>
      ${n.medianAge ? `<div class="data-row"><span class="data-row-label">Median Age</span>
        <span class="data-row-value">${n.medianAge}</span></div>` : ''}
      <div class="data-row"><span class="data-row-label">Voter Turnout (last general election)</span>
        <span class="data-row-value">${n.voterTurnout}%</span></div>
      <div class="data-row"><span class="data-row-label">Lot Vacancy Rate</span>
        <span class="data-row-value">${n.vacancyRate}%</span></div>
      <div class="data-row"><span class="data-row-label">Zoning Character</span>
        <span class="data-row-value" style="text-transform:capitalize">${n.zoning}</span></div>`);
  }

  // ── Local Guides ──────────────────────────────────────────────
  set('local-guides', `
    <div class="guide-card"><h3>Best Things to Do</h3>
      <p class="placeholder-note">Curated guide coming soon for ${n.name}.</p></div>
    <div class="guide-card"><h3>Top Restaurants</h3>
      <p class="placeholder-note">Restaurant picks coming soon for ${n.name}.</p></div>`);

  // ── Footer data timestamp ────────────────────────────────────
  set('data-updated-footer', `Data last updated: ${DATA_LAST_UPDATED}`);
  updateFavCount();
}

function updateFavCount() {
  const count = getFavs().length;
  document.querySelectorAll('.fav-count').forEach(el => {
    el.textContent = count > 0 ? `Favorites (${count})` : 'Favorites';
  });
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render().catch(e => console.error('[neighborhood.js]', e));

  // Keyboard shortcut: Escape closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.visible').forEach(m => m.classList.remove('visible'));
    }
  });
});
