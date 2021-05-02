const cacheName = 'VaneVane-v1';
const appShellFiles = [
  'index.html',
  'app.js',
  'cover.css',
  'bootstrap.min.css',
  'fondo.jpg',
  'perfil.png',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css',
  '/fontawesome/css/fontawesome.css',
  '/fontawesome/css/brands.min.css',
  'addtohomescreen.js',
  'addtohomescreen.css',
  '/icons/icon-16.png',
  '/icons/icon-32.png',
  '/icons/icon-64.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-168.png',
  '/icons/icon-192.png',
  '/icons/icon-256.png',
  '/icons/icon-512.png',
];

const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
