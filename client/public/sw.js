const CACHE_NAME = 'cakenutz-cache-v3';

// Core assets to cache immediately
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force new service worker to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => console.error('SW Cache Init Error:', err))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches when a new version is activated
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Handle Navigation Requests (HTML Pages / Routes)
  // When a user navigates to /calculator, /results, etc., they need index.html
  if (event.request.mode === 'navigate' || url.pathname.startsWith('/calculator') || url.pathname.startsWith('/results') || url.pathname.startsWith('/recipes') || url.pathname.startsWith('/settings') || url.pathname.startsWith('/ingredients')) {
    event.respondWith(
      caches.match('/index.html').then((cachedResponse) => {
        // Return cached index.html if available, else fetch from network
        return cachedResponse || fetch(event.request);
      }).catch(() => {
        // Fallback catch (shouldn't really hit if index.html is cached)
        return caches.match('/');
      })
    );
    return;
  }

  // 2. Handle API, Assets, and Static Files (Cache-First Strategy with Background Update)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Background network fetch to update cache for next time (Stale-While-Revalidate pattern)
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((error) => {
        console.log('Network fetch failed, relying on cache:', error);
      });

      // If we have it in the cache, return it instantly!
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, wait for the network response
      return fetchPromise;
    })
  );
});