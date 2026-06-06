
// Simple service worker: cache-first for app shell, network-first for other requests as needed
const CACHE_NAME = 'lushi-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // fonts and external resources could be cached too (optionally)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // fallback to cache-first for navigation & app shell
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other GET requests: try cache, then network
  if (req.method === 'GET') {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(resp => {
        // optionally cache fetched assets
        return resp;
      })).catch(()=> caches.match('/index.html'))
    );
  }
});
