/**
 * app.js — Search Page Coordinator
 * NYC Livability Index
 *
 * Orchestrates the search UI: sliders, filters, results, pagination,
 * compare modal, favorites, saved searches, shareable URLs.
 */

import {
  scoreAndFilter, sortResults, encodeSearchParams, decodeSearchParams,
  getFavorites, toggleFavorite, isFavorite,
  getSavedSearches, saveSearch,
  LS_KEYS, PAGE_SIZE, MAX_COMPARE, DATA_LAST_UPDATED,
  runTests,
} from './search.js';
import { neighborhoodContent } from '../data/neighborhood-content.js';
import { commuteTimes, COMMUTE_HUBS } from '../data/commute-times.js';


// ── State ──────────────────────────────────────────────────────
let allResults = [];
let shownCount = 0;
let compareSet = new Set();
// Multi-select: empty = show all boroughs
let selectedBoroughs = new Set();
let currentSort = 'match';


// ── DOM helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function showSpinner(show) {
  const sp = document.querySelector('.spinner-overlay');
  if (sp) sp.classList.toggle('visible', show);
}

// ── Slider persistence ─────────────────────────────────────────
function getSliderIds() {
  return ['safety', 'transit', 'affordability', 'nightlife', 'walkability', 'schools', 'groceries', 'parks', 'commute', 'noise',
    'weight-safety', 'weight-transit', 'weight-affordability', 'weight-nightlife', 'weight-walkability', 'weight-schools', 'weight-groceries', 'weight-parks'];
}

function getThresholdIds() {
  return ['safety', 'transit', 'affordability', 'nightlife', 'walkability', 'schools', 'groceries', 'parks', 'commute', 'noise']
    .map(k => `thresh-${k}`);
}

function saveSliderState() {
  const vals = {};
  getSliderIds().forEach(id => { const el = $(id); if (el) vals[id] = el.value; });
  getThresholdIds().forEach(id => { const el = $(id); if (el) vals[id] = el.value; });
  try { localStorage.setItem(LS_KEYS.weights, JSON.stringify(vals)); } catch { }
}

function restoreSliderState(vals) {
  if (!vals) return;
  Object.entries(vals).forEach(([id, val]) => {
    const el = $(id);
    if (el) { el.value = val; updateSliderDisplay(el); }
  });
}

function updateSliderDisplay(slider) {
  const id = slider.id;
  const valueEl = $(`${id}-value`);
  if (valueEl) {
    const isWeight = id.startsWith('weight-');
    const isThresh = id.startsWith('thresh-');
    valueEl.textContent = isWeight ? slider.value + '%' : (isThresh ? slider.value : slider.value);
  }
}

// ── Read current search params from UI ─────────────────────────
function getSearchParams() {
  const isAdvanced = $('advanced-mode') && $('advanced-mode').style.display !== 'none';
  let weights = {};

  if (isAdvanced) {
    const dims = ['safety', 'transit', 'affordability', 'nightlife', 'walkability', 'schools', 'groceries', 'parks'];
    const raw = {};
    dims.forEach(d => { raw[d] = parseInt($(`weight-${d}`)?.value || 50); });
    const total = Object.values(raw).reduce((a, b) => a + b, 0) || 1;
    dims.forEach(d => { weights[d] = Math.round((raw[d] / total) * 100); });
    weights.commute = parseInt($('commute')?.value || 0);
    weights.noise = parseInt($('noise')?.value || 0);
  } else {
    ['safety', 'transit', 'affordability', 'nightlife', 'walkability', 'schools', 'groceries', 'parks', 'commute', 'noise']
      .forEach(d => { weights[d] = parseInt($(d)?.value || 50); });
  }

  const thresholds = {};
  ['safety', 'transit', 'affordability', 'nightlife', 'walkability', 'schools', 'groceries', 'parks', 'commute', 'noise']
    .forEach(d => { thresholds[d] = parseInt($(`thresh-${d}`)?.value || 0); });

  return {
    weights,
    thresholds,
    budget: $('budget')?.value || '',
    // Read multi-select bedroom checkboxes
    bedrooms: (() => {
      const checked = [...document.querySelectorAll('input[name="bedrooms"]:checked')].map(el => el.value);
      return checked.length ? checked[0] : 'studio';
    })(),
    boroughs: selectedBoroughs.size === 0 ? null : [...selectedBoroughs],
    borough: 'all', // legacy fallback; scoring uses boroughs array
    nameQuery: $('name-search')?.value || '',
    commuteDest: $('commute-dest')?.value || 'none',
    excludeFlood: $('exclude-flood')?.checked || false,
    requireADA: $('require-ada')?.checked || false,
  };
}


// ── Apply URL params to UI ─────────────────────────────────────
function applyParamsToUI(decoded) {
  Object.entries(decoded.weights).forEach(([dim, val]) => {
    const el = $(dim);
    if (el) { el.value = val; updateSliderDisplay(el); }
  });
  if (decoded.budget && $('budget')) $('budget').value = decoded.budget;
  // Restore bedroom checkboxes
  if (decoded.bedrooms) {
    document.querySelectorAll('input[name="bedrooms"]').forEach(cb => { cb.checked = cb.value === decoded.bedrooms; });
  }
  if (decoded.commuteDest && $('commute-dest')) $('commute-dest').value = decoded.commuteDest;
  if (decoded.excludeFlood && $('exclude-flood')) $('exclude-flood').checked = true;
  if (decoded.borough && decoded.borough !== 'all') {
    // Restore single-borough selection from URL into multi-select
    selectedBoroughs.clear();
    selectedBoroughs.add(decoded.borough);
    $$('.borough-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.borough === decoded.borough);
    });
  }
}

// ── Main search ────────────────────────────────────────────────
function findNeighborhoods() {
  showSpinner(true);
  setTimeout(() => {
    try {
      const params = getSearchParams();
      saveSliderState();
      sessionStorage.setItem('searchReturnUrl', location.href.split('?')[0] + '?' + encodeSearchParams(params));

      const raw = scoreAndFilter(params);
      allResults = sortResults(raw, currentSort);
      shownCount = 0;
      compareSet.clear();
      updateCompareBar();
      displayResults();
    } catch (e) {
      console.error('[Search]', e);
    } finally {
      showSpinner(false);
    }
  }, 600);

}

function displayResults() {
  const section = $('results-section');
  const container = $('cards-container');
  if (!section || !container) return;

  if (allResults.length === 0) {
    section.style.display = 'block';
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">🗺️</div>
        <h3>No neighborhoods match your criteria</h3>
        <p>Try adjusting your minimum thresholds or expanding your filters.</p>
      </div>`;
    $('results-count') && ($('results-count').textContent = '0 neighborhoods');
    $('pagination-section') && ($('pagination-section').style.display = 'none');
    return;
  }

  section.style.display = 'block';
  $('results-count') && ($('results-count').textContent = `${allResults.length} neighborhoods`);

  const batch = allResults.slice(shownCount, shownCount + PAGE_SIZE);
  if (shownCount === 0) container.innerHTML = '';
  batch.forEach(n => container.appendChild(buildCard(n)));
  shownCount += batch.length;

  const pag = $('pagination-section');
  if (pag) pag.style.display = shownCount < allResults.length ? 'block' : 'none';
}

function buildCard(n) {
  const sc = n.safetyScore || 0;
  const cls = sc >= 70 ? 'green' : sc >= 50 ? 'yellow' : 'red';
  const label = sc >= 70 ? 'Minimal safety concerns' : sc >= 50 ? 'Moderate safety concerns' : 'Heightened safety concerns';
  const rent = n.displayRent ? `$${n.displayRent}` : 'N/A';
  const isFav = isFavorite(n.slug);

  // Pull card background image from neighborhoodContent
  const content = neighborhoodContent?.[n.slug];
  const imgUrl = content?.img1 || '';

  const rentRow = n.displayRent
    ? `<div class="stat-row"><span class="stat-label">Rent:</span><span class="stat-value">${rent}</span></div>` : '';

  // Budget indicator with inline tooltip icon
  const BUDGET_LABELS = {
    comfortable: '\u2713 Comfortable budget',
    high: 'Good budget position',
    mid: 'Mid-range budget',
    low: '\u26a0 Lower end',
    below: 'Below range'
  };
  const BUDGET_TIPS = {
    comfortable: 'Your budget is well above typical rents \u2014 plenty of options.',
    high: 'Your budget comfortably covers most listings here.',
    mid: 'Your budget covers mid-range options. Some trade-offs expected.',
    low: 'At the lower end. Competition for available units may be high.',
    below: 'Your budget is below typical rents here. Very limited options.'
  };
  const budgetHtml = n.budgetPosition ? `
    <div class="budget-indicator ${n.budgetPosition}">
      ${BUDGET_LABELS[n.budgetPosition] || n.budgetPosition}
      <span class="budget-info-icon" data-tip="${BUDGET_TIPS[n.budgetPosition] || ''}">i</span>
    </div>` : '';

  const card = document.createElement('div');
  card.className = 'neighborhood-card';
  card.dataset.slug = n.slug;
  card.innerHTML = `
    <div class="card-bg" style="background-image:url('${imgUrl}')"></div>
    <div class="card-overlay"></div>
    <div class="card-content">
      <div class="card-header">
        <div class="card-title-wrap">
          <div class="card-title">${n.name}</div>
          <div class="card-borough">${n.borough}</div>
        </div>
        <div class="card-actions">
          <button class="fav-btn${isFav ? ' active' : ''}" data-slug="${n.slug}" title="Save to favorites" aria-label="Toggle favorite">${isFav ? '\u2605' : '\u2606'}</button>
          <div class="match-score" title="Match Score: Personalized to your priorities">
            ${n.matchScore}
            <span class="match-score-label">match</span>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="safety-badge ${cls}">${label}</div>
        <div class="card-stats">
          ${rentRow}
          ${budgetHtml}
          <div class="stat-row"><span class="stat-label">Livability:</span><span class="stat-value">${n.livabilityScore ? Math.round(n.livabilityScore) : 'N/A'}/100</span></div>
          <div class="stat-row"><span class="stat-label">Transit:</span><span class="stat-value">${n.transitScore != null ? n.transitScore : 'N/A'}/100</span></div>
          <div class="stat-row"><span class="stat-label">Walk:</span><span class="stat-value">${n.walkScore != null ? n.walkScore : 'N/A'}</span></div>
          ${(() => { const dest = document.getElementById('commute-dest')?.value; if (!dest || dest === 'none') return ''; const mins = commuteTimes[n.slug]?.[dest]; if (mins == null) return ''; return `<div class="stat-row"><span class="stat-label">Commute (${COMMUTE_HUBS[dest]}):</span><span class="stat-value">${mins} min</span></div>`; })()}
        </div>
        <div class="card-footer-row">
          <label class="compare-check-wrap">
            <input type="checkbox" class="compare-check" data-slug="${n.slug}"> Compare
          </label>
          <a href="neighborhood.html?slug=${n.slug}" class="card-view-link">View details \u2192</a>
        </div>
      </div>
    </div>`;

  // Image fallback: if the neighborhood image fails, use an Unsplash NYC photo
  if (imgUrl) {
    const bg = card.querySelector('.card-bg');
    const probe = new Image();
    probe.onerror = () => { bg.style.backgroundImage = `url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=70')`; };
    probe.src = imgUrl;
  }

  // Favorite button
  card.querySelector('.fav-btn').addEventListener('click', e => {
    e.stopPropagation();
    const favs = toggleFavorite(n.slug);
    const btn = e.currentTarget;
    const now = isFavorite(n.slug);
    btn.textContent = now ? '\u2605' : '\u2606';
    btn.classList.toggle('active', now);
    updateNavFavCount();
    showToast(now ? `\u2605 ${n.name} saved to favorites` : `${n.name} removed from favorites`);
  });

  // Compare checkbox
  card.querySelector('.compare-check').addEventListener('change', e => {
    const slug = e.target.dataset.slug;
    if (e.target.checked) {
      if (compareSet.size >= MAX_COMPARE) {
        e.target.checked = false;
        showToast(`Max ${MAX_COMPARE} neighborhoods to compare`);
        return;
      }
      compareSet.add(slug);
    } else {
      compareSet.delete(slug);
    }
    updateCompareBar();
  });

  return card;
}

// ── Compare ────────────────────────────────────────────────────
function updateCompareBar() {
  const bar = document.querySelector('.compare-bar');
  if (!bar) return;
  const count = compareSet.size;
  bar.classList.toggle('visible', count >= 2);
  const label = bar.querySelector('.compare-label');
  if (label) label.textContent = `Compare Selected (${count}/${MAX_COMPARE})`;
}

function openCompareModal() {
  import('./search.js').then(({ neighborhoods: nbs }) => {
    const items = [...compareSet].map(slug => nbs.find(n => n.slug === slug)).filter(Boolean);
    if (items.length < 2) return;

    const fields = [
      { label: 'Borough', fn: n => n.borough },
      { label: 'Safety Score', fn: n => `${n.safetyScore}/100` },
      { label: 'Livability', fn: n => n.livabilityScore ? `${Math.round(n.livabilityScore)}/100` : 'N/A' },
      { label: 'Transit Score', fn: n => n.transitScore != null ? `${n.transitScore}/100` : 'N/A' },
      { label: 'Walk Score', fn: n => n.walkScore != null ? `${n.walkScore}/100` : 'N/A' },
      { label: 'School Score', fn: n => n.schoolScore != null ? `${Math.round(n.schoolScore)}/100` : 'N/A' },
      { label: 'Nightlife', fn: n => n.nightlifeScore != null ? `${n.nightlifeScore}/100` : 'N/A' },
      { label: 'Park Score', fn: n => n.parkScore != null ? `${n.parkScore}/100` : 'N/A' },
      { label: 'Studio Rent', fn: n => n.studioRentRange ? `$${n.studioRentRange}` : 'N/A' },
      { label: '1BR Rent', fn: n => n.rent1BR ? `$${n.rent1BR}` : 'N/A' },
      { label: `Commute (${COMMUTE_HUBS[document.getElementById('commute-dest')?.value] || 'Midtown'})`, fn: n => { const dest = document.getElementById('commute-dest')?.value; const mins = dest && dest !== 'none' ? commuteTimes[n.slug]?.[dest] : commuteTimes[n.slug]?.midtown; return mins != null ? `${mins} min` : 'N/A'; } },
      { label: 'Noise Complaints', fn: n => n.noiseComplaintsPer1000 != null ? `${n.noiseComplaintsPer1000}/1k` : 'N/A' },
      { label: 'Flood Zone', fn: n => n.floodZone ? '🌊 Yes' : '✓ No' },
    ];

    const headers = `<th></th>${items.map(n => `<th>${n.name}</th>`).join('')}`;
    const rows = fields.map(f => {
      const vals = items.map(n => f.fn(n));
      // Find best numeric value
      const nums = vals.map(v => parseFloat(v));
      const maxNum = Math.max(...nums.filter(x => !isNaN(x)));
      return `<tr><td>${f.label}</td>${vals.map((v, i) => {
        const isBest = !isNaN(nums[i]) && nums[i] === maxNum && nums.filter(x => !isNaN(x)).length > 1;
        return `<td class="${isBest ? 'compare-best' : ''}">${v}</td>`;
      }).join('')}</tr>`;
    }).join('');

    const modal = $('compare-modal');
    if (modal) {
      modal.querySelector('.compare-table-wrap').innerHTML = `
        <table class="compare-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
      modal.classList.add('visible');
    }
  });
}

// ── Saved searches ─────────────────────────────────────────────
function updateSavedSearchDropdown() {
  const sel = $('load-saved-search');
  if (!sel) return;
  const saved = getSavedSearches();
  sel.innerHTML = '<option value="">Load saved search...</option>' +
    saved.map((s, i) => `<option value="${i}">${s.name}</option>`).join('');
}

// ── Nav favorites count ────────────────────────────────────────
function updateNavFavCount() {
  const count = getFavorites().length;
  $$('.nav-favorites').forEach(el => {
    el.textContent = count > 0 ? `Favorites (${count})` : 'Favorites';
  });
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set data timestamp
  $$('[data-last-updated]').forEach(el => { el.textContent = DATA_LAST_UPDATED; });

  // Initialise multi-borough Set: starts empty (user must select manually)
  // Empty set = no filter applied (all boroughs shown)

  // Restore from URL params first, then localStorage
  const urlParams = location.search;
  if (urlParams) {
    applyParamsToUI(decodeSearchParams(urlParams));
  } else {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEYS.weights) || 'null');
      if (saved) restoreSliderState(saved);
    } catch { }
  }

  // Restore from sessionStorage (quick search on homepage)
  const quickBudget = sessionStorage.getItem('quickSearchBudget');
  const quickPriority = sessionStorage.getItem('quickSearchPriority');
  if (quickBudget) { const el = $('budget'); if (el) el.value = quickBudget; sessionStorage.removeItem('quickSearchBudget'); }
  if (quickPriority) {
    const el = $(quickPriority);
    if (el) { el.value = 100; updateSliderDisplay(el); }
    sessionStorage.removeItem('quickSearchPriority');
  }
  if (quickBudget || quickPriority) setTimeout(findNeighborhoods, 100);

  // Slider event listeners
  $$('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', function () {
      updateSliderDisplay(this);
      saveSliderState();
    });
  });

  // Borough chips — multi-select toggle (starts unselected; empty = all shown)
  $$('.borough-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      const b = this.dataset.borough;
      if (selectedBoroughs.has(b)) {
        selectedBoroughs.delete(b);
        this.classList.remove('active');
      } else {
        selectedBoroughs.add(b);
        this.classList.add('active');
      }
    });
  });

  // Find neighborhoods button
  $('find-btn')?.addEventListener('click', findNeighborhoods);

  // Reset button
  $('reset-btn')?.addEventListener('click', () => {
    $$('input[type="range"]').forEach(s => {
      s.value = s.id.startsWith('weight-') ? 10 : (s.id.startsWith('thresh-') ? 0 : 50);
      updateSliderDisplay(s);
    });
    $('budget') && ($('budget').value = '');
    $('name-search') && ($('name-search').value = '');
    // Reset bedroom checkboxes — studio only
    document.querySelectorAll('input[name="bedrooms"]').forEach(cb => { cb.checked = cb.value === 'studio'; });
    $('commute-dest') && ($('commute-dest').value = 'none');
    $('exclude-flood') && ($('exclude-flood').checked = false);
    $('require-ada') && ($('require-ada').checked = false);
    // Reset boroughs: clear all selections (empty = all shown)
    selectedBoroughs.clear();
    $$('.borough-chip').forEach(c => c.classList.remove('active'));

    if ($('results-section')) $('results-section').style.display = 'none';
    showToast('Filters reset');
  });


  // Share button
  $('share-btn')?.addEventListener('click', () => {
    const params = getSearchParams();
    const url = location.origin + location.pathname + '?' + encodeSearchParams(params);
    navigator.clipboard?.writeText(url).then(() => showToast('📋 Link copied!')).catch(() => {
      prompt('Copy this URL:', url);
    });
  });

  // Save search
  $('save-search-btn')?.addEventListener('click', () => {
    const name = $('save-search-name')?.value.trim();
    if (!name) { showToast('Enter a name for this search'); return; }
    const params = getSearchParams();
    saveSearch(name, params.weights, { budget: params.budget, bedrooms: params.bedrooms, borough: params.borough });
    if ($('save-search-name')) $('save-search-name').value = '';
    updateSavedSearchDropdown();
    showToast(`💾 Saved "${name}"`);
  });

  // Load saved search
  $('load-saved-search')?.addEventListener('change', function () {
    const idx = parseInt(this.value);
    if (isNaN(idx)) return;
    const saved = getSavedSearches()[idx];
    if (!saved) return;
    Object.entries(saved.weights || {}).forEach(([dim, val]) => {
      const el = $(dim);
      if (el) { el.value = val; updateSliderDisplay(el); }
    });
    if (saved.extra?.budget && $('budget')) $('budget').value = saved.extra.budget;
    if (saved.extra?.bedrooms && $('bedrooms')) $('bedrooms').value = saved.extra.bedrooms;
    showToast(`Loaded "${saved.name}"`);
    this.value = '';
  });

  // Sort dropdown
  $('sort-select')?.addEventListener('change', function () {
    currentSort = this.value;
    allResults = sortResults(allResults, currentSort);
    shownCount = 0;
    displayResults();
  });

  // Load more button
  $('load-more-btn')?.addEventListener('click', displayResults);

  // Compare bar
  document.querySelector('.compare-bar')?.addEventListener('click', openCompareModal);

  // Compare modal close
  $('compare-modal-close')?.addEventListener('click', () => $('compare-modal')?.classList.remove('visible'));
  $('compare-modal')?.addEventListener('click', e => {
    if (e.target === $('compare-modal')) $('compare-modal').classList.remove('visible');
  });

  // Name search — debounced live filter (waits 350ms after typing stops)
  let nameSearchTimer = null;
  $('name-search')?.addEventListener('input', () => {
    clearTimeout(nameSearchTimer);
    nameSearchTimer = setTimeout(() => findNeighborhoods(), 350);
  });


  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.modal-overlay.visible').forEach(m => m.classList.remove('visible'));
    if (e.key === 'Enter' && document.activeElement?.tagName !== 'BUTTON') findNeighborhoods();
  });

  updateSavedSearchDropdown();
  updateNavFavCount();
  runTests();
});

// Expose for inline HTML onclick (backwards compat)
window.findNeighborhoods = findNeighborhoods;
