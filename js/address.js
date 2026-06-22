/* ============================================================
   Address Dashboard — address.js
   Pulls live data from NYC Open Data, Planning Labs geocoder,
   and JustFix WhoOwnsWhat.
   ============================================================ */

const GEOCODER = 'https://geosearch.planninglabs.nyc/v2/search?text=';
const OD = 'https://data.cityofnewyork.us/resource/';

// DOB complaint category codes → readable labels (partial list of most relevant)
const DOB_CATEGORIES = {
  '01': 'Building',
  '02': 'Electrical',
  '03': 'Elevator',
  '04': 'Plumbing',
  '05': 'Boiler',
  '06': 'Facade',
  '07': 'Sign',
  '08': 'Sprinkler',
  '09': 'Standpipe',
  '10': 'Scaffold',
  '31': 'Illegal Conversion',
  '45': 'Stop Work Order',
  '71': 'Construction',
  '81': 'Structural',
};

// Borough number → name mapping
const BOROUGH_NAMES = {
  '1': 'MANHATTAN',
  '2': 'BRONX',
  '3': 'BROOKLYN',
  '4': 'QUEENS',
  '5': 'STATEN ISLAND',
};

// 311 complaint types to highlight for housing quality
const HOUSING_COMPLAINT_TYPES = new Set([
  'HEAT/HOT WATER',
  'HEATING',
  'PLUMBING',
  'PAINT/PLASTER',
  'MOLD',
  'RODENT',
  'PEST CONTROL',
  'COCKROACH/INSECTS',
  'INSECTS',
  'ELEVATOR',
  'DOOR/WINDOW',
  'WATER LEAK',
  'GENERAL CONSTRUCTION',
  'FLOOR/STAIRS',
  'ELECTRIC',
  'APPLIANCE',
  'OUTSIDE BUILDING',
  'GENERAL',
]);

// -------------------------------------------------------
// Entry point
// -------------------------------------------------------
async function runAddressLookup() {
  const input = document.getElementById('address-input').value.trim();
  if (!input) return;

  const btn = document.getElementById('search-btn');
  btn.disabled = true;
  btn.textContent = 'Looking up…';

  hideError();
  hideDashboard();
  resetSkeletons();

  try {
    const geo = await geocodeAddress(input);
    showDashboard(geo);

    // Fire all data fetches in parallel, render each as it resolves
    await Promise.allSettled([
      fetchAndRenderHPD(geo),
      fetchAndRender311(geo),
      fetchAndRenderDOB(geo),
      fetchAndRenderEvictions(geo),
      renderRentStabilization(geo),
      renderWhoOwnsWhat(geo),
    ]);

    renderRiskScore();
  } catch (err) {
    showError(err.message || 'Something went wrong. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Check Building';
  }
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('address-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runAddressLookup();
  });
});

// -------------------------------------------------------
// Geocoding
// -------------------------------------------------------
async function geocodeAddress(rawAddress) {
  const query = rawAddress.includes('New York') ? rawAddress : rawAddress + ', New York, NY';
  const res = await fetch(GEOCODER + encodeURIComponent(query));
  if (!res.ok) throw new Error('Geocoder unavailable — please try again.');
  const data = await res.json();
  if (!data.features || data.features.length === 0) {
    throw new Error('Address not found. Try including the borough (e.g., "123 Main St, Brooklyn").');
  }

  const f = data.features[0];
  const props = f.properties;
  const pad = props.addendum?.pad || {};

  const bbl = pad.bbl || null;        // 10-digit string: borough(1) + block(5) + lot(4)
  const bin = pad.bin || null;        // Building identification number
  const boroughNum = bbl ? bbl[0] : null;
  const boroughName = boroughNum ? BOROUGH_NAMES[boroughNum] : null;

  // Normalized address from geocoder
  const label = props.label || props.name || rawAddress;
  const streetAddress = props.name || rawAddress;

  // Parse block and lot from BBL
  const block = bbl ? bbl.slice(1, 6) : null;
  const lot = bbl ? bbl.slice(6) : null;

  // Year built and unit count from DOB data in geocoder response
  const yearBuilt = props.addendum?.bbl?.yearbuilt || null;
  const unitsRes = props.addendum?.bbl?.unitsres || null;

  return { bbl, bin, boroughNum, boroughName, block, lot, label, streetAddress, yearBuilt, unitsRes };
}

// -------------------------------------------------------
// UI helpers
// -------------------------------------------------------
function showDashboard(geo) {
  const dashboard = document.getElementById('dashboard');
  dashboard.classList.remove('hidden');

  document.getElementById('building-address-display').textContent = geo.label;
  const bblEl = document.getElementById('building-bbl');
  if (geo.bbl) {
    bblEl.textContent = `BBL ${geo.bbl} · BIN ${geo.bin || '—'} · ${geo.boroughName || ''}`;
  } else {
    bblEl.textContent = 'BBL not resolved — some data may be unavailable';
  }
}

function hideDashboard() {
  document.getElementById('dashboard').classList.add('hidden');
}

function showError(msg) {
  const banner = document.getElementById('error-banner');
  document.getElementById('error-msg').textContent = msg;
  banner.classList.remove('hidden');
}

function hideError() {
  document.getElementById('error-banner').classList.add('hidden');
}

function resetSkeletons() {
  ['hpd-content', 'complaints-content', 'dob-content', 'eviction-content', 'rent-stab-content', 'wow-content'].forEach(id => {
    document.getElementById(id).innerHTML = '<div class="skeleton-block"></div>';
  });
  ['hpd-tag', 'complaints-tag', 'dob-tag', 'eviction-tag'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.className = 'section-tag'; }
  });
  document.getElementById('risk-grade').textContent = '—';
  document.getElementById('risk-grade').className = 'risk-grade';
  ['stat-hpd', 'stat-311', 'stat-dob', 'stat-eviction'].forEach(id => {
    document.getElementById(id).innerHTML = '<div class="stat-skeleton"></div>';
  });
  // Reset score state
  window._scoreData = {};
}

// -------------------------------------------------------
// Risk Score (assembled after all fetches complete)
// -------------------------------------------------------
window._scoreData = {};

function renderRiskScore() {
  const s = window._scoreData;
  let score = 100;
  const factors = [];

  // HPD Open Class C violations (immediately hazardous)
  const openC = s.openC || 0;
  if (openC > 0) {
    const penalty = Math.min(openC * 20, 60);
    score -= penalty;
    factors.push({ dot: 'bad', text: `${openC} open Class C violation${openC > 1 ? 's' : ''} (immediately hazardous)` });
  }

  // HPD Open Class B
  const openB = s.openB || 0;
  if (openB > 0) {
    const penalty = Math.min(openB * 5, 20);
    score -= penalty;
    if (openB >= 3) {
      factors.push({ dot: 'warn', text: `${openB} open Class B violations (hazardous)` });
    }
  }

  // Lots of open Class A
  const openA = s.openA || 0;
  if (openA > 8) {
    score -= 5;
    factors.push({ dot: 'warn', text: `${openA} open Class A violations (minor but many)` });
  }

  // 311 complaint volume (last 24 months)
  const complaints311 = s.complaints311 || 0;
  if (complaints311 > 20) {
    score -= 10;
    factors.push({ dot: 'warn', text: `${complaints311} housing complaints in the last 2 years` });
  } else if (complaints311 > 8) {
    score -= 5;
  }

  // DOB stop work orders
  if (s.stopWorkOrder) {
    score -= 20;
    factors.push({ dot: 'bad', text: 'Stop Work Order on file with DOB' });
  }

  // High DOB complaint volume
  const dobCount = s.dobCount || 0;
  if (dobCount > 10) {
    score -= 8;
    factors.push({ dot: 'warn', text: `${dobCount} DOB complaints on record` });
  }

  // Evictions
  const evictions = s.evictions || 0;
  if (evictions > 5) {
    score -= 10;
    factors.push({ dot: 'bad', text: `${evictions} eviction filings on record` });
  } else if (evictions > 2) {
    score -= 5;
    factors.push({ dot: 'warn', text: `${evictions} eviction filings on record` });
  }

  // Positive signals
  if (openC === 0 && openB === 0 && openA < 3) {
    factors.push({ dot: 'good', text: 'No open hazardous HPD violations' });
  }
  if (complaints311 < 5) {
    factors.push({ dot: 'good', text: 'Low 311 complaint volume' });
  }

  score = Math.max(0, Math.min(100, score));

  const gradeEl = document.getElementById('risk-grade');
  let grade, cls;
  if (score >= 85)      { grade = 'A'; cls = 'grade-A'; }
  else if (score >= 70) { grade = 'B'; cls = 'grade-B'; }
  else if (score >= 55) { grade = 'C'; cls = 'grade-C'; }
  else if (score >= 35) { grade = 'D'; cls = 'grade-D'; }
  else                  { grade = 'F'; cls = 'grade-F'; }

  gradeEl.textContent = grade;
  gradeEl.className = `risk-grade ${cls}`;

  // Append factors below the building header
  const header = document.querySelector('.building-header');
  const existing = document.querySelector('.risk-factors');
  if (existing) existing.remove();

  if (factors.length > 0) {
    const div = document.createElement('div');
    div.className = 'risk-factors';
    div.innerHTML = `
      <h4>Grade factors</h4>
      <ul class="risk-factor-list">
        ${factors.map(f => `<li><span class="rf-dot ${f.dot}"></span>${f.text}</li>`).join('')}
      </ul>`;
    header.insertAdjacentElement('afterend', div);
  }
}

// -------------------------------------------------------
// HPD Violations
// -------------------------------------------------------
async function fetchAndRenderHPD(geo) {
  const el = document.getElementById('hpd-content');
  const statEl = document.getElementById('stat-hpd');
  const tagEl = document.getElementById('hpd-tag');

  if (!geo.bbl) {
    el.innerHTML = noData('BBL required for HPD lookup — try a more specific address.');
    statEl.innerHTML = statCard('—', 'HPD Violations');
    return;
  }

  try {
    const url = `${OD}wvxf-dwi5.json?$where=bbl='${geo.bbl}'&$limit=500&$order=novissueddate DESC`;
    const data = await fetchJSON(url);

    const byClass = { A: [], B: [], C: [] };
    for (const v of data) {
      const cls = (v.class || v.violationclass || '').toUpperCase().trim();
      if (byClass[cls]) byClass[cls].push(v);
    }

    const isOpen = v => {
      const s = (v.violationstatus || v.currentstatus || '').toUpperCase();
      return s.includes('OPEN') || s.includes('ACTIVE') || s === 'NOV SENT OUT' || s === 'NOTICE OF VIOLATION ISSUED (NOV)';
    };

    const openC = byClass.C.filter(isOpen).length;
    const openB = byClass.B.filter(isOpen).length;
    const openA = byClass.A.filter(isOpen).length;
    const totalOpen = openC + openB + openA;
    const totalAll = data.length;

    // Save to risk score state
    window._scoreData.openC = openC;
    window._scoreData.openB = openB;
    window._scoreData.openA = openA;

    // Stat card
    const statCls = openC > 0 ? 'danger' : openB > 2 ? 'warning' : 'ok';
    statEl.innerHTML = `
      <div class="stat-num ${statCls}">${totalOpen}</div>
      <div class="stat-label">Open HPD Violations</div>`;

    // Section tag
    if (openC > 0) { tagEl.textContent = 'Red Flag'; tagEl.className = 'section-tag tag-red'; }
    else if (openB >= 3) { tagEl.textContent = 'Review'; tagEl.className = 'section-tag tag-yellow'; }
    else if (totalAll === 0) { tagEl.textContent = 'No record'; tagEl.className = 'section-tag tag-gray'; }
    else { tagEl.textContent = 'OK'; tagEl.className = 'section-tag tag-green'; }

    // Class breakdown
    const classSummary = `
      <div class="violation-summary">
        <div class="viol-class-block class-c">
          <div class="viol-class-title">Class C — Immediately Hazardous</div>
          <div class="viol-open-count">${openC}</div>
          <div class="viol-open-label">open of ${byClass.C.length} total</div>
        </div>
        <div class="viol-class-block class-b">
          <div class="viol-class-title">Class B — Hazardous</div>
          <div class="viol-open-count">${openB}</div>
          <div class="viol-open-label">open of ${byClass.B.length} total</div>
        </div>
        <div class="viol-class-block class-a">
          <div class="viol-class-title">Class A — Non-Hazardous</div>
          <div class="viol-open-count">${openA}</div>
          <div class="viol-open-label">open of ${byClass.A.length} total</div>
        </div>
      </div>`;

    if (totalAll === 0) {
      el.innerHTML = `<div class="section-body">${classSummary}<div class="no-data"><div class="no-data-icon">✓</div>No HPD violations on record for this building.</div></div>`;
      return;
    }

    // Recent violations table (top 15)
    const recent = data.slice(0, 15);
    const rows = recent.map(v => {
      const cls = (v.class || v.violationclass || '—').toUpperCase();
      const status = v.violationstatus || v.currentstatus || '—';
      const open = isOpen(v);
      const date = formatDate(v.novissueddate || v.approveddate);
      const desc = truncate(v.novdescription || v.violationdescription || '—', 80);
      return `<tr>
        <td><span class="badge badge-${cls.toLowerCase()}">${cls}</span></td>
        <td>${desc}</td>
        <td>${date}</td>
        <td><span class="badge ${open ? 'badge-open' : 'badge-closed'}">${open ? 'Open' : 'Closed'}</span></td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="section-body">
        ${classSummary}
        <table class="data-table">
          <thead><tr><th>Class</th><th>Description</th><th>Issued</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        ${totalAll > 15 ? `<button class="show-more-btn" onclick="window.open('https://hpdonline.nyc.gov/hpdonline/building-search','_blank')">View all ${totalAll} violations on HPD Online ↗</button>` : ''}
      </div>`;

  } catch (err) {
    el.innerHTML = noData('Could not load HPD data. ' + err.message);
    statEl.innerHTML = statCard('—', 'HPD Violations');
  }
}

// -------------------------------------------------------
// 311 Complaints
// -------------------------------------------------------
async function fetchAndRender311(geo) {
  const el = document.getElementById('complaints-content');
  const statEl = document.getElementById('stat-311');
  const tagEl = document.getElementById('complaints-tag');

  if (!geo.bbl) {
    el.innerHTML = noData('BBL required for 311 lookup.');
    statEl.innerHTML = statCard('—', '311 Complaints');
    return;
  }

  try {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const since = twoYearsAgo.toISOString().slice(0, 10);

    const url = `${OD}erm2-nwe9.json?$where=bbl='${geo.bbl}' AND created_date >= '${since}T00:00:00.000'&$limit=300&$order=created_date DESC`;
    const data = await fetchJSON(url);

    window._scoreData.complaints311 = data.length;

    statEl.innerHTML = `
      <div class="stat-num ${data.length > 20 ? 'warning' : 'ok'}">${data.length}</div>
      <div class="stat-label">311 Complaints (2yr)</div>`;

    if (data.length > 15) { tagEl.textContent = 'High volume'; tagEl.className = 'section-tag tag-yellow'; }
    else if (data.length === 0) { tagEl.textContent = 'None'; tagEl.className = 'section-tag tag-green'; }
    else { tagEl.textContent = `${data.length} complaints`; tagEl.className = 'section-tag tag-gray'; }

    if (data.length === 0) {
      el.innerHTML = `<div class="section-body"><div class="no-data"><div class="no-data-icon">✓</div>No 311 complaints in the last 24 months.</div></div>`;
      return;
    }

    // Tally by complaint type
    const counts = {};
    for (const c of data) {
      const type = (c.complaint_type || 'OTHER').toUpperCase().trim();
      counts[type] = (counts[type] || 0) + 1;
    }

    // Sort descending
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const maxCount = sorted[0][1];

    const bars = sorted.slice(0, 12).map(([type, count]) => {
      const pct = Math.round((count / maxCount) * 100);
      const isHousing = HOUSING_COMPLAINT_TYPES.has(type);
      return `
        <div class="complaint-bar-row">
          <div class="complaint-bar-label">${titleCase(type)}</div>
          <div class="complaint-bar-track"><div class="complaint-bar-fill" style="width:${pct}%;background:${isHousing ? '#dc2626' : '#94a3b8'}"></div></div>
          <div class="complaint-bar-count">${count}</div>
        </div>`;
    }).join('');

    // Recent 10 complaints table
    const recentRows = data.slice(0, 10).map(c => {
      const date = formatDate(c.created_date);
      const type = c.complaint_type || '—';
      const desc = truncate(c.descriptor || '—', 60);
      const status = c.status || '—';
      return `<tr>
        <td>${type}</td>
        <td>${desc}</td>
        <td>${date}</td>
        <td>${status}</td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="section-body">
        <div class="complaint-bars">${bars}</div>
        <table class="data-table">
          <thead><tr><th>Type</th><th>Description</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>${recentRows}</tbody>
        </table>
        ${data.length > 10 ? `<button class="show-more-btn">Showing 10 of ${data.length} complaints</button>` : ''}
      </div>`;

  } catch (err) {
    el.innerHTML = noData('Could not load 311 data. ' + err.message);
    statEl.innerHTML = statCard('—', '311 Complaints');
  }
}

// -------------------------------------------------------
// DOB Complaints
// -------------------------------------------------------
async function fetchAndRenderDOB(geo) {
  const el = document.getElementById('dob-content');
  const statEl = document.getElementById('stat-dob');
  const tagEl = document.getElementById('dob-tag');

  if (!geo.bin) {
    el.innerHTML = noData('BIN required for DOB lookup — could not be resolved from this address.');
    statEl.innerHTML = statCard('—', 'DOB Complaints');
    return;
  }

  try {
    const url = `${OD}eabe-havv.json?$where=bin='${geo.bin}'&$limit=200&$order=date_entered DESC`;
    const data = await fetchJSON(url);

    const stopWork = data.filter(d => d.complaint_category === '45');

    window._scoreData.dobCount = data.length;
    window._scoreData.stopWorkOrder = stopWork.length > 0;

    const hasSWO = stopWork.length > 0;

    statEl.innerHTML = `
      <div class="stat-num ${hasSWO ? 'danger' : data.length > 10 ? 'warning' : 'ok'}">${data.length}</div>
      <div class="stat-label">DOB Complaints</div>`;

    if (hasSWO) { tagEl.textContent = 'Stop Work Order'; tagEl.className = 'section-tag tag-red'; }
    else if (data.length > 10) { tagEl.textContent = 'High volume'; tagEl.className = 'section-tag tag-yellow'; }
    else if (data.length === 0) { tagEl.textContent = 'None'; tagEl.className = 'section-tag tag-green'; }
    else { tagEl.textContent = `${data.length} on record`; tagEl.className = 'section-tag tag-gray'; }

    if (data.length === 0) {
      el.innerHTML = `<div class="section-body"><div class="no-data"><div class="no-data-icon">✓</div>No DOB complaints on record.</div></div>`;
      return;
    }

    const rows = data.slice(0, 15).map(d => {
      const date = formatDate(d.date_entered || d.dateentered);
      const catCode = d.complaint_category || '—';
      const catLabel = DOB_CATEGORIES[catCode] || `Category ${catCode}`;
      const status = d.status || '—';
      const isSWO = catCode === '45';
      return `<tr>
        <td>${isSWO ? '<span class="badge badge-stop-work">STOP WORK</span> ' : ''}${catLabel}</td>
        <td>${date}</td>
        <td>${status}</td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="section-body">
        ${hasSWO ? `<div style="background:#fff0f0;border:1px solid #fca5a5;border-radius:8px;padding:12px 16px;margin-bottom:16px;color:#b91c1c;font-size:0.9rem;font-weight:600;">⚠️ Stop Work Order detected — verify this has been resolved before signing a lease.</div>` : ''}
        <table class="data-table">
          <thead><tr><th>Category</th><th>Filed</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        ${data.length > 15 ? `<button class="show-more-btn">Showing 15 of ${data.length} complaints</button>` : ''}
      </div>`;

  } catch (err) {
    el.innerHTML = noData('Could not load DOB data. ' + err.message);
    statEl.innerHTML = statCard('—', 'DOB Complaints');
  }
}

// -------------------------------------------------------
// Eviction Filings
// -------------------------------------------------------
async function fetchAndRenderEvictions(geo) {
  const el = document.getElementById('eviction-content');
  const statEl = document.getElementById('stat-eviction');
  const tagEl = document.getElementById('eviction-tag');

  // The evictions dataset (6z8x-wfk4) uses eviction_address — query by normalized address + borough
  // We'll try to match on address components
  if (!geo.bbl && !geo.streetAddress) {
    el.innerHTML = noData('Address required for eviction lookup.');
    statEl.innerHTML = statCard('—', 'Eviction Filings');
    return;
  }

  try {
    // Parse house number and street from the geocoder label
    // geo.streetAddress is like "123 Main St"
    const parts = (geo.streetAddress || '').trim().toUpperCase().split(' ');
    const houseNum = parts[0] || '';
    const street = parts.slice(1).join(' ');

    // Try BBL-based query first (some eviction datasets have it), then fall back to address
    let data = [];
    if (geo.bbl) {
      const url = `${OD}6z8x-wfk4.json?$where=bbl='${geo.bbl}'&$limit=100&$order=executed_date DESC`;
      data = await fetchJSON(url).catch(() => []);
    }

    // If BBL returned nothing, try address-based query
    if (data.length === 0 && houseNum && street) {
      const boroughForQuery = geo.boroughName || '';
      const url = `${OD}6z8x-wfk4.json?$where=upper(eviction_address) like '${houseNum} ${street}%'${boroughForQuery ? ` AND upper(borough)='${boroughForQuery}'` : ''}&$limit=100&$order=executed_date DESC`;
      data = await fetchJSON(url).catch(() => []);
    }

    window._scoreData.evictions = data.length;

    statEl.innerHTML = `
      <div class="stat-num ${data.length > 5 ? 'danger' : data.length > 1 ? 'warning' : 'ok'}">${data.length}</div>
      <div class="stat-label">Eviction Filings</div>`;

    if (data.length > 5) { tagEl.textContent = 'Frequent'; tagEl.className = 'section-tag tag-red'; }
    else if (data.length > 0) { tagEl.textContent = `${data.length} found`; tagEl.className = 'section-tag tag-yellow'; }
    else { tagEl.textContent = 'None found'; tagEl.className = 'section-tag tag-green'; }

    if (data.length === 0) {
      el.innerHTML = `<div class="section-body"><div class="no-data"><div class="no-data-icon">✓</div>No eviction filings found for this address.</div></div>`;
      return;
    }

    const rows = data.slice(0, 15).map(d => {
      const date = formatDate(d.executed_date || d.docket_date);
      const addr = d.eviction_address || d.respondent_address || geo.streetAddress;
      const apt = d.eviction_apt_num || d.apartment || '—';
      return `<tr>
        <td>${addr}</td>
        <td>Apt ${apt}</td>
        <td>${date}</td>
      </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="section-body">
        <table class="data-table">
          <thead><tr><th>Address</th><th>Unit</th><th>Date</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

  } catch (err) {
    el.innerHTML = noData('Could not load eviction data. ' + err.message);
    statEl.innerHTML = statCard('—', 'Eviction Filings');
  }
}

// -------------------------------------------------------
// Rent Stabilization
// -------------------------------------------------------
async function renderRentStabilization(geo) {
  const el = document.getElementById('rent-stab-content');

  // Heuristic: units built before 1974 with 6+ residential units are likely stabilized
  // We'll check the PLUTO/geocoder data for year built and unit count
  // Fallback: link to DHCR and provide indicator
  try {
    // Try to get building info from DOB Buildings dataset via BIN
    let yearBuilt = geo.yearBuilt ? parseInt(geo.yearBuilt) : null;
    let unitsRes = geo.unitsRes ? parseInt(geo.unitsRes) : null;

    // If not in geocoder, try DOB buildings dataset
    if ((!yearBuilt || !unitsRes) && geo.bin) {
      const url = `${OD}ipu4-2q9a.json?$where=bin='${geo.bin}'&$limit=1`;
      const dobData = await fetchJSON(url).catch(() => []);
      if (dobData.length > 0) {
        yearBuilt = yearBuilt || parseInt(dobData[0].year_built || dobData[0].yearbuilt || 0) || null;
        unitsRes = unitsRes || parseInt(dobData[0].residential_units || dobData[0].unitsres || 0) || null;
      }
    }

    let html = '';
    const pre1974 = yearBuilt && yearBuilt < 1974;
    const sixPlusUnits = unitsRes && unitsRes >= 6;
    const likelyStabilized = pre1974 && sixPlusUnits;
    const possible = pre1974 || sixPlusUnits;

    const metaLine = [
      yearBuilt ? `Built ${yearBuilt}` : null,
      unitsRes ? `${unitsRes} residential unit${unitsRes !== 1 ? 's' : ''}` : null,
    ].filter(Boolean).join(' · ');

    if (likelyStabilized) {
      html = `
        <div class="rent-stab-card">
          <div class="stab-indicator">
            <div class="stab-icon likely">🏛️</div>
            <div class="stab-text">
              <h4>Likely Rent Stabilized</h4>
              <p>${metaLine ? metaLine + ' — b' : 'B'}uildings built before 1974 with 6+ units are typically covered under NYC rent stabilization. Verify with DHCR before signing.</p>
              <a class="dhcr-link" href="https://www.nyshcr.org/Apps/BuildingSearch/" target="_blank" rel="noopener">Check official DHCR building search ↗</a>
            </div>
          </div>
        </div>`;
    } else if (possible) {
      html = `
        <div class="rent-stab-card">
          <div class="stab-indicator">
            <div class="stab-icon check">🔍</div>
            <div class="stab-text">
              <h4>Check DHCR — Possibly Stabilized</h4>
              <p>${metaLine ? metaLine + '. Some' : 'Some'} units in this building may be stabilized. The heuristic (pre-1974 + 6+ units) is a guide only — check the official DHCR database to confirm.</p>
              <a class="dhcr-link" href="https://www.nyshcr.org/Apps/BuildingSearch/" target="_blank" rel="noopener">Check official DHCR building search ↗</a>
            </div>
          </div>
        </div>`;
    } else {
      html = `
        <div class="rent-stab-card">
          <div class="stab-indicator">
            <div class="stab-icon unlikely">📋</div>
            <div class="stab-text">
              <h4>Likely Not Stabilized${yearBuilt && yearBuilt >= 1974 ? ' (Post-1974 construction)' : ''}</h4>
              <p>${metaLine ? metaLine + '. ' : ''}Buildings built in 1974 or later are generally not stabilized unless they received certain tax benefits (421-a/J-51). Verify with DHCR if unsure.</p>
              <a class="dhcr-link" href="https://www.nyshcr.org/Apps/BuildingSearch/" target="_blank" rel="noopener">Verify on DHCR ↗</a>
            </div>
          </div>
        </div>`;
    }

    el.innerHTML = html;
  } catch (err) {
    el.innerHTML = `<div class="rent-stab-card"><div class="stab-indicator"><div class="stab-icon check">📋</div><div class="stab-text"><h4>Rent Stabilization — Check DHCR</h4><p>Could not determine automatically. Check the DHCR building search to confirm whether this address has stabilized units.</p><a class="dhcr-link" href="https://www.nyshcr.org/Apps/BuildingSearch/" target="_blank" rel="noopener">DHCR Building Search ↗</a></div></div></div>`;
  }
}

// -------------------------------------------------------
// WhoOwnsWhat (JustFix)
// -------------------------------------------------------
async function renderWhoOwnsWhat(geo) {
  const el = document.getElementById('wow-content');

  if (!geo.bbl) {
    el.innerHTML = noData('BBL required for WhoOwnsWhat lookup.');
    return;
  }

  const block = geo.block || '';
  const lot = geo.lot || '';
  const boroughNum = geo.boroughNum || '';

  const wowPortfolioUrl = `https://whoownswhat.justfix.org/en/portfolio/map?block=${block}&lot=${lot}&borough=${boroughNum}`;

  try {
    // Try the WhoOwnsWhat API (may have CORS restrictions)
    const apiUrl = `https://whoownswhat.justfix.org/api/address?block=${block}&lot=${lot}&borough=${boroughNum}`;
    const data = await fetchJSON(apiUrl, { timeout: 5000 });

    const addr = data.addrs && data.addrs[0];
    const ownerName = addr?.ownernames?.[0]?.value || '—';
    const portfolioBuildings = data.addrs?.length || '—';
    const portfolioUnits = data.addrs?.reduce((sum, a) => sum + (parseInt(a.unitsres) || 0), 0) || '—';

    // Total open violations across portfolio
    const portfolioViolations = data.addrs?.reduce((sum, a) => sum + (parseInt(a.openviolations) || 0), 0) || '—';

    el.innerHTML = `
      <div class="wow-body">
        <div class="wow-grid">
          <div class="wow-item">
            <div class="wow-item-label">Registered Owner</div>
            <div class="wow-item-value">${ownerName}</div>
          </div>
          <div class="wow-item">
            <div class="wow-item-label">Portfolio — Buildings</div>
            <div class="wow-item-value">${portfolioBuildings}</div>
          </div>
          <div class="wow-item">
            <div class="wow-item-label">Portfolio — Units</div>
            <div class="wow-item-value">${portfolioUnits}</div>
          </div>
          <div class="wow-item">
            <div class="wow-item-label">Portfolio — Open Violations</div>
            <div class="wow-item-value" style="${typeof portfolioViolations === 'number' && portfolioViolations > 50 ? 'color:#dc2626' : ''}">${portfolioViolations}</div>
          </div>
        </div>
        <a class="wow-link-btn" href="${wowPortfolioUrl}" target="_blank" rel="noopener">View full portfolio on WhoOwnsWhat ↗</a>
      </div>`;

  } catch (_) {
    // API blocked or errored — show fallback link
    el.innerHTML = `
      <div class="wow-body">
        <p style="font-size:0.9rem;color:#555;margin-bottom:14px;">WhoOwnsWhat shows the landlord's full portfolio — how many buildings they own and their total violation count. This helps flag bad actors who accumulate properties.</p>
        <a class="wow-link-btn" href="${wowPortfolioUrl}" target="_blank" rel="noopener">Look up landlord on WhoOwnsWhat ↗</a>
      </div>`;
  }
}

// -------------------------------------------------------
// Utilities
// -------------------------------------------------------
async function fetchJSON(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeout || 12000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function formatDate(str) {
  if (!str) return '—';
  try {
    const d = new Date(str);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (_) { return str.slice(0, 10); }
}

function truncate(str, max) {
  if (!str) return '—';
  return str.length > max ? str.slice(0, max) + '…' : str;
}

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function noData(msg) {
  return `<div class="no-data"><div class="no-data-icon">–</div>${msg}</div>`;
}

function statCard(num, label) {
  return `<div class="stat-num">${num}</div><div class="stat-label">${label}</div>`;
}
