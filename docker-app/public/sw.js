// Service worker for face-detection app
// Precaches app shell and face-api.js models for offline capability
// Uses Workbox for efficient precaching and runtime caching

// Precache app shell and model files using injected manifest
precacheAndRoute(self.__WB_MANIFEST, {
  cleanupOutdatedCaches: true,
  ignoreURLParametersMatching: [/./],
});

// Cache-first strategy for model files (large, rarely change)
registerRoute(
  ({ url }) => url.pathname.startsWith('/models/'),
  new CacheFirst({
    cacheName: 'face-api-models',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        maxEntries: 50,
      }),
    ],
  })
);

// Cache-first for WASM files (large binaries)
registerRoute(
  ({ url }) => url.pathname.startsWith('/wasm/'),
  new CacheFirst({
    cacheName: 'tensorflow-wasm',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        maxEntries: 10,
      }),
    ],
  })
);

// Network-first for HTML navigation (always try to get latest version)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Stale-while-revalidate for images and other static assets
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Skip waiting on message (for immediate update activation)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Log service worker activation
self.addEventListener('activate', (event) => {
  console.log('[SW] Service worker activated - precaching app shell and models');
  event.waitUntil(self.clients.claim());
});
