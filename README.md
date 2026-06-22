# NYC Livability Index

A data-driven, client-side NYC apartment search tool comparing 111 neighborhoods across safety, transit, rent, schools, nightlife, and more.

## 🚀 Running Locally

ES modules require an HTTP server (not `file://` protocol):

```bash
python3 -m http.server 8080
```

Then open: http://localhost:8080

## 📁 Project Structure

```
├── index.html          — Homepage with quick search
├── search.html         — Full neighborhood search with sliders
├── neighborhood.html   — Dynamic neighborhood template (?slug=chelsea)
├── favorites.html      — Saved/favorited neighborhoods
├── livability.html     — Interactive Leaflet.js map
├── hpd-guide.html      — HPD violation guide + building lookup
├── transportation.html — Subway safety ratings
├── sw.js               — Service worker (cache-first + URL redirects)
├── sitemap.xml         — SEO sitemap for all 111 neighborhoods
│
├── styles/             — CSS design system
│   ├── variables.css   — All CSS custom properties
│   ├── base.css        — Base styles + nav + footer
│   ├── search.css      — Search page styles
│   ├── neighborhood.css — Neighborhood page styles
│   └── map.css         — Leaflet map styles
│
├── css/                — Legacy CSS (homepage, transportation, etc.)
│
├── data/               — ES module data files
│   ├── neighborhoods.js    — 111 neighborhoods, all scores normalized 0-100
│   ├── subway-stations.js  — 423 stations with risk indices
│   └── hpd-violations.js  — 383 HPD violation codes
│
├── js/                 — ES module JavaScript
│   ├── search.js       — Scoring engine, URL params, localStorage
│   ├── app.js          — Search page coordinator
│   └── neighborhood.js — Dynamic neighborhood page logic
│
└── scripts/            — Build/data scripts
    └── transform_neighborhoods.py
```

## 📊 Data Field Reference

All numeric scores are **0-100 scale**:

| Field | Original Scale | Notes |
|-------|---------------|-------|
| `safetyScore` | /10 → ×10 | From NYPD precinct data |
| `transitScore` | 0-100 | Direct |
| `walkScore` | 0-100 | Walk Score® |
| `bikeScore` | 0-100 | Direct |
| `schoolScore` | 0-100 | NYC school quality |
| `nightlifeScore` | 1-5 → ×20 | Normalized |
| `groceryScore` | 1-5 → ×20 | Normalized |
| `parkScore` | 1-5 → ×20 | Normalized |
| `restaurantDensity` | 1-5 → ×20 | Normalized |
| `medicalDensity` | 1-5 → ×20 | Normalized |
| `livabilityScore` | 0-100 | Pre-computed composite |
| `subwaySketchyIndex` | 0-100 | Perception metric |

### Placeholder Data (Replace with Real Data)

| Field | Source Needed |
|-------|--------------|
| `floodZone` | FEMA NFHL API |
| `noiseComplaintsPer1000` | NYC Open Data 311 |
| `commuteTimes` | MTA GTFS real-time data |
| `hasElevator` (subway-stations.js) | MTA ADA API |

## 🗺️ Neighborhood URLs

Old format: `/bushwick.html` → New format: `/neighborhood.html?slug=bushwick`

The service worker automatically redirects old URLs for backwards compatibility.

## 🔧 Adding Neighborhoods

1. Add entry to `data/neighborhoods.js` with all required fields
2. Include `slug`, `name`, `borough`, and score fields
3. Add to `sitemap.xml`
4. Add commute times to `transform_neighborhoods.py`

## 📅 Data Last Updated: 2026-04-21
