
const CACHE = 'north-star-v2';

const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle requests from this app.
  if (url.origin !== self.location.origin) return;

  // Always check the network first for the main app page.
  if (
    request.mode === 'navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/Personal-Operating-OS/')
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache =>
              cache.put(request, copy)
            );
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached =>
            cached || caches.match('./index.html')
          )
        )
    );
    return;
  }

  // For other app files, use the cache and update it from the network.
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache =>
            cache.put(request, copy)
          );
        }
        return response;
      });

      return cached || network.catch(() => caches.match('./index.html'));
    })
  );
});
