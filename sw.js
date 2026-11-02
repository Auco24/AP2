/* Service Worker: macht die App offline nutzbar (Network-first, Cache als Offline-Fallback). */
const CACHE = 'ap2-trainer-v1';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './css/style.css', './js/markdown.js', './js/app.js',
  './data/categories.js', './data/tasks-ga1.js', './data/tasks-ga2.js', './data/tasks-wiso.js',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Netzwerk zuerst (damit neue Aufgaben sofort sichtbar sind), bei Offline aus dem Cache.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
