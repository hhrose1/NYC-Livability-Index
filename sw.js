/**
 * sw.js — Service Worker
 * NYC Livability Index
 *
 * Cache-first strategy. Caches all HTML/CSS/JS/data on install.
 * On fetch, serves from cache first; falls back to network.
 * Also intercepts old neighborhood HTML URLs and redirects to neighborhood.html?slug=...
 */

const CACHE_NAME = 'nyc-livability-v4';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/search.html',
  '/neighborhood.html',
  '/favorites.html',
  '/livability.html',
  '/address.html',
  '/hpd-guide.html',
  '/transportation.html',
  '/styles/variables.css',
  '/styles/base.css',
  '/styles/search.css',
  '/styles/neighborhood.css',
  '/styles/map.css',
  '/css/main.css',
  '/css/homepage.css',
  '/css/style.css',
  '/css/hpd-guide.css',
  '/css/transportation.css',
  '/js/app.js',
  '/js/search.js',
  '/js/neighborhood.js',
  '/js/address-lookup.js',
  '/js/geo-utils.js',
  '/js/config.js',
  '/data/neighborhoods.js',
  '/data/hpd-violations.js',
  '/data/subway-coords.js',
  '/data/neighborhood-environment.js',
  '/data/park-ratings.js',
  '/data/neighborhood-content.js',
];

// ── Install — pre-cache critical assets ───────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS).catch(err => {
        console.warn('[SW] Some precache entries failed:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

// ── Activate — clean up old caches ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch — cache-first with backwards compat redirects ───────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Redirect old neighborhood HTML files to new template
  // e.g. /bushwick.html -> /neighborhood.html?slug=bushwick
  if (url.pathname.endsWith('.html') &&
      url.pathname !== '/index.html' &&
      url.pathname !== '/search.html' &&
      url.pathname !== '/neighborhood.html' &&
      url.pathname !== '/favorites.html' &&
      url.pathname !== '/livability.html' &&
      url.pathname !== '/hpd-guide.html' &&
      url.pathname !== '/transportation.html' &&
      url.pathname !== '/address.html' &&
      url.pathname !== '/apartments.html') {
    const filename = url.pathname.replace(/^\//, '').replace(/\.html$/, '');
    // Check if it looks like a neighborhood slug (not a known page)
    if (filename && !filename.includes('/')) {
      const redirectUrl = `${url.origin}/neighborhood.html?slug=${filename}`;
      event.respondWith(Response.redirect(redirectUrl, 302));
      return;
    }
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Cache successful GET responses
          if (event.request.method === 'GET' && response.status === 200) {
            const toCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
          }
          return response;
        });
      })
      .catch(() => {
        // Offline fallback for HTML pages
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});
