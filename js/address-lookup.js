import { haversineKm, nearestStation } from './geo-utils.js';
import { subwayCoords } from '../data/subway-coords.js';
import { neighborhoodEnvironment } from '../data/neighborhood-environment.js';
import { parkRatings } from '../data/park-ratings.js';
import { neighborhoods } from '../data/neighborhoods.js';

// NYC Geosearch — free, no API key required
const NYC_GEOCODE = 'https://geosearch.planninglabs.nyc/v2/autocomplete';

// slug may be null on the standalone address page; inferred from geocoding in that case
export function initAddressLookup(slug = null) {
  const input  = document.getElementById('address-input');
  const btn    = document.getElementById('address-search-btn');
  const list   = document.getElementById('address-suggestions');

  if (!input || !btn || !list) return;

  let debounceTimer = null;
  let selectedCoords = null;
  let selectedSlug   = slug;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    if (q.length < 3) { list.hidden = true; return; }
    debounceTimer = setTimeout(() => fetchSuggestions(q, list, (coords, inferredSlug) => {
      selectedCoords = coords;
      selectedSlug = slug ?? inferredSlug;
    }), 300);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { list.hidden = true; }
  });

  btn.addEventListener('click', () => {
    if (selectedCoords) {
      list.hidden = true;
      runDashboard(selectedCoords.lat, selectedCoords.lng, selectedSlug);
    } else if (input.value.trim().length >= 3) {
      geocodeAndRun(input.value.trim(), slug);
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });
}

function inferSlugFromFeature(feature) {
  const p = feature.properties || {};
  const raw = (p.neighbourhood || p.locality || p.borough || '').toLowerCase().trim();
  if (!raw) return null;
  return neighborhoods.find(n =>
    n.name.toLowerCase().includes(raw) || raw.includes(n.name.toLowerCase().split('/')[0].split('(')[0].trim())
  )?.slug ?? null;
}

async function fetchSuggestions(query, listEl, onSelect) {
  const url = `${NYC_GEOCODE}?text=${encodeURIComponent(query)}&size=5`;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const json = await res.json();
    const features = json.features || [];
    if (!features.length) { listEl.hidden = true; return; }

    listEl.innerHTML = features.map((f, i) =>
      `<li class="suggestion-item" data-index="${i}">${f.properties.label}</li>`
    ).join('');
    listEl.hidden = false;

    listEl.querySelectorAll('.suggestion-item').forEach((li, i) => {
      li.addEventListener('mousedown', e => {
        e.preventDefault();
        const f = features[i];
        document.getElementById('address-input').value = f.properties.label;
        listEl.hidden = true;
        const [lng, lat] = f.geometry.coordinates;
        const inferredSlug = inferSlugFromFeature(f);
        onSelect({ lat, lng }, inferredSlug);
      });
    });
  } catch {
    listEl.hidden = true;
  }
}

async function geocodeAndRun(query, presetSlug) {
  const url = `${NYC_GEOCODE}?text=${encodeURIComponent(query)}&size=1`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    const f = json.features?.[0];
    if (!f) { renderError('Address not found. Try a more specific NYC address.'); return; }
    const [lng, lat] = f.geometry.coordinates;
    const slug = presetSlug ?? inferSlugFromFeature(f);
    runDashboard(lat, lng, slug);
  } catch {
    renderError('Could not geocode address. Check your connection and try again.');
  }
}

function renderError(msg) {
  const el = document.getElementById('address-dashboard');
  if (el) el.innerHTML = `<p class="dashboard-error">${msg}</p>`;
}

async function runDashboard(lat, lng, slug) {
  const dashboard = document.getElementById('address-dashboard');
  if (!dashboard) return;

  showDashboardSkeleton(dashboard);

  const [citiBikeResult, crashResult, overpassResult] = await Promise.allSettled([
    fetchCitiBike(lat, lng),
    fetchCrashData(lat, lng),
    fetchOverpassPOIs(lat, lng),
  ]);

  const subway  = nearestStation(lat, lng, subwayCoords);
  const envData = neighborhoodEnvironment.find(e => e.slug === slug);
  const park    = parkRatings.find(p => p.slug === slug);
  const nbhd    = neighborhoods.find(n => n.slug === slug);

  renderMobilityCard(subway, citiBikeResult.status === 'fulfilled' ? citiBikeResult.value : null, nbhd);
  renderServicesCard(overpassResult.status === 'fulfilled' ? overpassResult.value : null);
  renderLifestyleCard(overpassResult.status === 'fulfilled' ? overpassResult.value : null);
  renderEnvironmentCard(envData, overpassResult.status === 'fulfilled' ? overpassResult.value : null);
  renderParksCard(park, overpassResult.status === 'fulfilled' ? overpassResult.value : null);
  renderUrbanContextCard(nbhd, crashResult.status === 'fulfilled' ? crashResult.value : null);
}

function showDashboardSkeleton(container) {
  const cards = [
    { id: 'mobility',      title: 'Mobility & Transit' },
    { id: 'services',      title: 'Essential Services' },
    { id: 'lifestyle',     title: 'Lifestyle & Culture' },
    { id: 'environment',   title: 'Environment & Health' },
    { id: 'parks',         title: 'Parks & Recreation' },
    { id: 'urban-context', title: 'Urban Context & Safety' },
  ];
  container.innerHTML = cards.map(c => `
    <div class="dashboard-card loading" id="dashboard-card-${c.id}">
      <div class="dashboard-card-header">${c.title}</div>
      <div class="dashboard-card-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>`).join('');
}

function setCard(id, html) {
  const card = document.getElementById(`dashboard-card-${id}`);
  if (!card) return;
  card.classList.remove('loading');
  card.querySelector('.dashboard-card-body').innerHTML = html;
}

function unavail() {
  return '<span class="data-unavailable">Temporarily unavailable</span>';
}

function dataRow(label, value) {
  return `<div class="data-row"><span class="data-row-label">${label}</span><span class="data-row-value">${value}</span></div>`;
}

// ── Citi Bike ─────────────────────────────────────────────────
async function fetchCitiBike(lat, lng) {
  const [infoRes, statusRes] = await Promise.all([
    fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json'),
    fetch('https://gbfs.citibikenyc.com/gbfs/en/station_status.json'),
  ]);
  const infoJson   = await infoRes.json();
  const statusJson = await statusRes.json();

  const statusMap = {};
  for (const s of statusJson.data.stations) {
    statusMap[s.station_id] = s;
  }

  let nearest = null, nearestDist = Infinity;
  for (const s of infoJson.data.stations) {
    const d = haversineKm(lat, lng, s.lat, s.lon);
    if (d < nearestDist) { nearestDist = d; nearest = { ...s, ...statusMap[s.station_id] }; }
  }
  if (!nearest) return null;

  const total = (nearest.num_docks_available || 0) + (nearest.num_bikes_available || 0);
  const pct = total > 0 ? Math.round((nearest.num_docks_available || 0) / total * 100) : 0;
  return { station: nearest, distKm: nearestDist, dockPct: pct };
}

// ── Crash Data ────────────────────────────────────────────────
async function fetchCrashData(lat, lng) {
  const d = 0.004;
  const url = `https://data.cityofnewyork.us/resource/h9gi-nx95.json`
    + `?$where=latitude>${lat-d} AND latitude<${lat+d} AND longitude>${lng-d} AND longitude<${lng+d}`
    + ` AND number_of_pedestrians_injured>0&$limit=50&$order=crash_date DESC`;
  const res = await fetch(url);
  return res.json();
}

// ── Overpass POIs ─────────────────────────────────────────────
async function fetchOverpassPOIs(lat, lng) {
  const q = `
    [out:json][timeout:20];
    (
      node["shop"~"laundry|laundromat"](around:500,${lat},${lng});
      node["shop"~"supermarket|grocery"](around:500,${lat},${lng});
      node["amenity"~"gym|fitness_centre"](around:500,${lat},${lng});
      node["leisure"="fitness_centre"](around:500,${lat},${lng});
      node["amenity"="restaurant"](around:400,${lat},${lng});
      node["amenity"~"bar|nightclub|pub"](around:400,${lat},${lng});
      node["amenity"~"place_of_worship"](around:800,${lat},${lng});
      node["tourism"~"museum"](around:1000,${lat},${lng});
      node["amenity"~"theatre|arts_centre"](around:1000,${lat},${lng});
      node["leisure"="park"](around:1000,${lat},${lng});
      way["leisure"="park"](around:1000,${lat},${lng});
    );
    out center;
  `;
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(q)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  const json = await res.json();
  return categorizeOverpassResults(json.elements || [], lat, lng);
}

function categorizeOverpassResults(elements, lat, lng) {
  const cats = { laundry: [], grocery: [], gym: [], restaurant: [], bar: [], worship: [], cultural: [], park: [] };
  for (const el of elements) {
    const elLat = el.lat ?? el.center?.lat;
    const elLng = el.lon ?? el.center?.lon;
    const dist = (elLat && elLng) ? haversineKm(lat, lng, elLat, elLng) : null;
    const tags = el.tags || {};
    const name = tags.name || 'Unnamed';
    const entry = { name, dist };

    const shop = tags.shop || '';
    const amenity = tags.amenity || '';
    const leisure = tags.leisure || '';
    const tourism = tags.tourism || '';

    if (shop.match(/laundry|laundromat/)) cats.laundry.push(entry);
    else if (shop.match(/supermarket|grocery/)) cats.grocery.push(entry);
    else if (amenity.match(/gym|fitness_centre/) || leisure === 'fitness_centre') cats.gym.push(entry);
    else if (amenity === 'restaurant') cats.restaurant.push(entry);
    else if (amenity.match(/bar|nightclub|pub/)) cats.bar.push(entry);
    else if (amenity === 'place_of_worship') cats.worship.push(entry);
    else if (tourism === 'museum' || amenity.match(/theatre|arts_centre/)) cats.cultural.push(entry);
    else if (leisure === 'park') cats.park.push(entry);
  }
  // Sort each category by distance
  for (const k of Object.keys(cats)) {
    cats[k].sort((a, b) => (a.dist ?? Infinity) - (b.dist ?? Infinity));
  }
  return cats;
}

function fmtDist(km) {
  if (km == null) return '—';
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(2)} km`;
}

// ── Card Renderers ────────────────────────────────────────────
function renderMobilityCard(subway, citiBike, nbhd) {
  const subwayRow = subway?.station
    ? dataRow('Nearest subway', `${subway.station.name} — ${fmtDist(subway.distanceKm)}`)
    : dataRow('Nearest subway', unavail());

  const transitRow = nbhd?.transitScore != null
    ? dataRow('Transit score', `${nbhd.transitScore}/100`)
    : '';

  const walkRow = nbhd?.walkScore != null
    ? dataRow('Walk score', `${nbhd.walkScore}/100`)
    : '';

  let bikeRow = '';
  if (citiBike) {
    const { station, distKm, dockPct } = citiBike;
    bikeRow = dataRow('Nearest Citi Bike', `${station.name} — ${fmtDist(distKm)} (${dockPct}% docks free)`);
  } else if (citiBike === null) {
    bikeRow = dataRow('Citi Bike', 'No stations nearby');
  } else {
    bikeRow = dataRow('Citi Bike', unavail());
  }

  setCard('mobility', subwayRow + transitRow + walkRow + bikeRow);
}

function renderServicesCard(pois) {
  if (!pois) { setCard('services', unavail()); return; }
  const laundry  = pois.laundry[0];
  const grocery  = pois.grocery[0];
  const gym      = pois.gym[0];
  const html = [
    dataRow('Nearest laundromat', laundry ? `${laundry.name} (${fmtDist(laundry.dist)})` : 'None found within 500m'),
    dataRow('Nearest grocery',    grocery ? `${grocery.name} (${fmtDist(grocery.dist)})` : 'None found within 500m'),
    dataRow('Nearest gym',        gym     ? `${gym.name} (${fmtDist(gym.dist)})`         : 'None found within 500m'),
  ].join('');
  setCard('services', html);
}

function renderLifestyleCard(pois) {
  if (!pois) { setCard('lifestyle', unavail()); return; }
  const html = [
    dataRow('Restaurants within 400m', pois.restaurant.length.toString()),
    dataRow('Bars / nightlife within 400m', pois.bar.length.toString()),
    dataRow('Places of worship within 800m', pois.worship.length.toString()),
    dataRow('Cultural venues within 1km', pois.cultural.length.toString()),
  ].join('');
  setCard('lifestyle', html);
}

function renderEnvironmentCard(env, pois) {
  const rows = [];
  if (env) {
    rows.push(dataRow('Air quality (PM2.5 µg/m³)', env.aqi.toString()));
    rows.push(dataRow('Heat vulnerability index', `${env.hvi}/5`));
    rows.push(dataRow('Street trees per block', env.treeDensity.toString()));
  } else {
    rows.push(dataRow('Air quality', unavail()));
  }
  if (pois) {
    rows.push(dataRow('Parks within 1km', pois.park.length.toString()));
  }
  setCard('environment', rows.join(''));
}

function renderParksCard(park, pois) {
  const rows = [];
  if (park) {
    rows.push(dataRow('Park inspection rating', park.rating));
    rows.push(dataRow('Last inspected', park.inspectionDate));
  } else {
    rows.push(dataRow('Park inspection', unavail()));
  }
  if (pois?.park[0]) {
    const p = pois.park[0];
    rows.push(dataRow('Nearest park', `${p.name} (${fmtDist(p.dist)})`));
  }
  setCard('parks', rows.join(''));
}

function renderUrbanContextCard(nbhd, crashes) {
  const rows = [];
  if (nbhd) {
    rows.push(dataRow('Safety score', nbhd.safetyScore != null ? `${Math.round(nbhd.safetyScore)}/100` : '—'));
    rows.push(dataRow('Zoning', nbhd.zoning ? nbhd.zoning.charAt(0).toUpperCase() + nbhd.zoning.slice(1) : '—'));
    rows.push(dataRow('Lot vacancy rate', nbhd.vacancyRate != null ? `${nbhd.vacancyRate}%` : '—'));
    rows.push(dataRow('Voter turnout', nbhd.voterTurnout != null ? `${nbhd.voterTurnout}%` : '—'));
  }
  if (crashes) {
    rows.push(dataRow('Recent ped. injury crashes nearby', crashes.length.toString()));
  } else {
    rows.push(dataRow('Crash data', unavail()));
  }
  setCard('urban-context', rows.join(''));
}
