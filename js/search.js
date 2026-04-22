/**
 * search.js — Search Engine & UI Logic
 * NYC Livability Index
 *
 * Scoring algorithm:
 *   1. For each neighborhood, compute a raw score per dimension (all 0-100)
 *   2. Multiply each dimension score by user weight (0-100 → normalized 0-1)
 *   3. Divide weighted sum by total weight to get final match score (0-100)
 *   4. Apply minimum threshold filters to exclude below-minimum neighborhoods
 *   5. Sort by match score descending
 */

import { neighborhoods, DATA_LAST_UPDATED } from '../data/neighborhoods.js';

// ── Constants ──────────────────────────────────────────────────
const PAGE_SIZE = 20;
const MAX_COMPARE = 3;
const LS_KEYS = {
  weights: 'nyc_weights',
  thresholds: 'nyc_thresholds',
  favorites: 'nyc_favorites',
  saved: 'nyc_saved_searches',
  mode: 'nyc_search_mode',
};

// ── State ──────────────────────────────────────────────────────
let allResults = [];
let shownCount = 0;
let compareSet = new Set();
let selectedBorough = 'all';
let currentSort = 'match';

// ── Scoring ────────────────────────────────────────────────────
function parseRentMin(range) {
  if (!range || range === '') return null;
  const parts = String(range).split('-');
  const v = parseFloat(parts[0].replace(/[^0-9.]/g, ''));
  return isNaN(v) ? null : v;
}

function parseRentMax(range) {
  if (!range || range === '') return null;
  const parts = String(range).split('-');
  const v = parseFloat((parts[1] || parts[0]).replace(/[^0-9.]/g, ''));
  return isNaN(v) ? null : v;
}

function getRentRange(n, bedrooms) {
  if (bedrooms === '1br') return n.rent1BR;
  if (bedrooms === '2br') return n.rent2BR;
  return n.studioRentRange;
}

function getBudgetPosition(budget, range) {
  if (!budget || !range) return null;
  const min = parseRentMin(range);
  const max = parseRentMax(range);
  if (!min || !max) return null;
  if (budget < min) return 'below';
  if (budget >= max) return 'comfortable';
  const pos = (budget - min) / (max - min);
  return pos < 0.33 ? 'low' : pos < 0.67 ? 'mid' : 'high';
}

function normalizeScore(value, min, max, reverse = false) {
  if (max === min) return 50;
  let n = ((value - min) / (max - min)) * 100;
  return reverse ? 100 - n : n;
}

function commuteScore(n, destination) {
  if (!destination || destination === 'none' || !n.commuteTimes) return 50;
  const minutes = n.commuteTimes[destination];
  if (minutes == null) return 50;
  // Lower time = higher score. 15 min = 100, 90 min = 0
  return Math.max(0, Math.min(100, 100 - ((minutes - 15) / 75) * 100));
}

// Fuzzy match — returns true if name contains query (case-insensitive, substring)
function fuzzyMatch(name, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const n = name.toLowerCase();
  if (n.includes(q)) return true;
  // Simple char-by-char fuzzy
  let qi = 0;
  for (let i = 0; i < n.length && qi < q.length; i++) {
    if (n[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function scoreAndFilter(params) {
  const {
    weights, thresholds, budget, bedrooms,
    borough = 'all',   // legacy single-select fallback
    boroughs,          // multi-select array; takes precedence when provided
    nameQuery, commuteDest, excludeFlood, requireADA,
  } = params;

  // Pre-compute rent normalization range
  const rentVals = neighborhoods
    .map(nb => parseRentMin(getRentRange(nb, bedrooms)))
    .filter(v => v != null && v > 0);
  const minRent = Math.min(...rentVals);
  const maxRent = Math.max(...rentVals);

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1;

  return neighborhoods
    .filter(n => {
      try {
        // Multi-borough filter (boroughs array) takes precedence
        if (boroughs && boroughs.length > 0) {
          if (!boroughs.includes(n.borough)) return false;
        } else if (borough !== 'all' && n.borough !== borough) {
          return false;
        }

        if (nameQuery && !fuzzyMatch(n.name, nameQuery)) return false;
        if (excludeFlood && n.floodZone) return false;

        // Budget filter
        if (budget) {
          const rentMin = parseRentMin(getRentRange(n, bedrooms));
          if (rentMin && rentMin > budget) return false;
        }

        // Minimum thresholds — each threshold is 0-10, scores are 0-100
        const scoreMap = buildScoreMap(n, minRent, maxRent, bedrooms, commuteDest);
        for (const [dim, minVal] of Object.entries(thresholds)) {
          if (minVal > 0 && scoreMap[dim] < minVal * 10) return false;
        }

        return true;
      } catch (e) {
        console.error('[Filter error]', n?.name, e);
        return true;
      }
    })
    .map(n => {
      try {
        const scoreMap = buildScoreMap(n, minRent, maxRent, bedrooms, commuteDest);
        let weighted = 0;
        for (const [dim, w] of Object.entries(weights)) {
          weighted += (scoreMap[dim] || 0) * (w / totalWeight);
        }
        const rentRange = getRentRange(n, bedrooms);
        return {
          ...n,
          matchScore: Math.round(Math.max(0, Math.min(100, weighted))),
          budgetPosition: budget ? getBudgetPosition(parseFloat(budget), rentRange) : null,
          displayRent: rentRange,
        };
      } catch (e) {
        console.error('[Score error]', n?.name, e);
        return { ...n, matchScore: 0, budgetPosition: null, displayRent: '' };
      }
    });
}

function buildScoreMap(n, minRent, maxRent, bedrooms, commuteDest) {
  const rent = parseRentMin(getRentRange(n, bedrooms));
  const affordScore = rent ? normalizeScore(rent, minRent, maxRent, true) : 50;
  return {
    safety:       n.safetyScore ?? 50,
    transit:      n.transitScore ?? 50,
    affordability: affordScore,
    nightlife:    n.nightlifeScore ?? 50,
    walkability:  n.walkScore ?? 50,
    schools:      n.schoolScore ?? 50,
    groceries:    n.groceryScore ?? 50,
    parks:        n.parkScore ?? 50,
    commute:      commuteScore(n, commuteDest),
    noise:        n.noiseComplaintsPer1000 != null
                  ? Math.max(0, 100 - n.noiseComplaintsPer1000)
                  : 50,
  };
}

// ── URL Params ─────────────────────────────────────────────────
export function encodeSearchParams(params) {
  const p = new URLSearchParams();
  const w = params.weights || {};
  if (w.safety !== undefined) p.set('safety', w.safety);
  if (w.transit !== undefined) p.set('transit', w.transit);
  if (w.affordability !== undefined) p.set('affordability', w.affordability);
  if (w.nightlife !== undefined) p.set('nightlife', w.nightlife);
  if (w.walkability !== undefined) p.set('walkability', w.walkability);
  if (w.schools !== undefined) p.set('schools', w.schools);
  if (w.groceries !== undefined) p.set('groceries', w.groceries);
  if (w.parks !== undefined) p.set('parks', w.parks);
  if (w.commute !== undefined) p.set('commute', w.commute);
  if (params.budget) p.set('budget', params.budget);
  if (params.bedrooms) p.set('bedrooms', params.bedrooms);
  if (params.borough && params.borough !== 'all') p.set('borough', params.borough);
  if (params.commuteDest) p.set('commuteDest', params.commuteDest);
  if (params.excludeFlood) p.set('excludeFlood', '1');
  return p.toString();
}

export function decodeSearchParams(search) {
  const p = new URLSearchParams(search);
  const get = (k, def) => p.has(k) ? Number(p.get(k)) : def;
  return {
    weights: {
      safety:       get('safety', 50),
      transit:      get('transit', 50),
      affordability:get('affordability', 50),
      nightlife:    get('nightlife', 50),
      walkability:  get('walkability', 50),
      schools:      get('schools', 50),
      groceries:    get('groceries', 50),
      parks:        get('parks', 50),
      commute:      get('commute', 0),
      noise:        get('noise', 0),
    },
    budget:       p.get('budget') || '',
    bedrooms:     p.get('bedrooms') || 'studio',
    borough:      p.get('borough') || 'all',
    commuteDest:  p.get('commuteDest') || 'none',
    excludeFlood: p.get('excludeFlood') === '1',
  };
}

// ── localStorage ───────────────────────────────────────────────
export function saveToLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}
export function loadFromLS(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
}

export function getFavorites() { return loadFromLS(LS_KEYS.favorites, []); }
export function toggleFavorite(slug) {
  const favs = getFavorites();
  const idx = favs.indexOf(slug);
  if (idx >= 0) favs.splice(idx, 1); else favs.push(slug);
  saveToLS(LS_KEYS.favorites, favs);
  return favs;
}
export function isFavorite(slug) { return getFavorites().includes(slug); }

export function getSavedSearches() { return loadFromLS(LS_KEYS.saved, []); }
export function saveSearch(name, weights, extra) {
  const saved = getSavedSearches();
  saved.push({ name, weights, extra, savedAt: new Date().toISOString() });
  saveToLS(LS_KEYS.saved, saved);
  return saved;
}

// ── Sorting ────────────────────────────────────────────────────
export function sortResults(results, sortBy) {
  const copy = [...results];
  switch (sortBy) {
    case 'safety':  return copy.sort((a, b) => (b.safetyScore || 0) - (a.safetyScore || 0));
    case 'rent':    return copy.sort((a, b) => (parseRentMin(a.displayRent) || 9999) - (parseRentMin(b.displayRent) || 9999));
    case 'name':    return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:        return copy.sort((a, b) => b.matchScore - a.matchScore);
  }
}

// ── Inline unit tests ──────────────────────────────────────────
// Run in dev: import and call runTests()
export function runTests() {
  const defaultWeights = { safety:100, transit:50, affordability:50, nightlife:50, walkability:50, schools:50, groceries:50, parks:50, commute:0, noise:0 };
  const defaultThresholds = Object.fromEntries(Object.keys(defaultWeights).map(k => [k, 0]));

  const results = scoreAndFilter({
    weights: defaultWeights, thresholds: defaultThresholds,
    budget: null, bedrooms: 'studio', borough: 'all',
    nameQuery: '', commuteDest: 'none', excludeFlood: false,
  });
  const sorted = sortResults(results, 'match');

  const chelseaIdx = sorted.findIndex(n => n.name === 'Chelsea');
  const huntsIdx   = sorted.findIndex(n => n.name === 'Hunts Point');

  if (chelseaIdx < 0) console.error('[Test FAIL] Chelsea not found');
  else if (huntsIdx < 0) console.error('[Test FAIL] Hunts Point not found');
  else if (chelseaIdx > huntsIdx) console.error(`[Test FAIL] Chelsea(${chelseaIdx}) should rank above Hunts Point(${huntsIdx}) on safety-priority search`);
  else console.log(`[Test PASS] Chelsea(rank ${chelseaIdx+1}) > Hunts Point(rank ${huntsIdx+1}) on safety search`);

  // Weight affects ranking
  const zeroWeights = Object.fromEntries(Object.keys(defaultWeights).map(k => [k, 0]));
  const zeroResults = scoreAndFilter({ weights: zeroWeights, thresholds: defaultThresholds, budget: null, bedrooms: 'studio', borough: 'all', nameQuery: '', commuteDest: 'none', excludeFlood: false });
  zeroResults.forEach(r => {
    if (r.matchScore !== 0) console.error(`[Test FAIL] Zero weights should yield score=0, got ${r.matchScore} for ${r.name}`);
  });
  console.log('[Test PASS] Zero weights produce score=0');
  console.log(`[Tests] Done. ${results.length} neighborhoods scored.`);
}

// Export constants
export { LS_KEYS, PAGE_SIZE, MAX_COMPARE, DATA_LAST_UPDATED };
export { neighborhoods };

