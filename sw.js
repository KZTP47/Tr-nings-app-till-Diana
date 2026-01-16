/**
 * Diana Fitness PWA - Service Worker
 * Handles caching for offline functionality
 */

const CACHE_NAME = 'diana-fitness-v6';
const STATIC_CACHE_NAME = 'diana-fitness-static-v6';
const DYNAMIC_CACHE_NAME = 'diana-fitness-dynamic-v6';

// Files to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/data.js',
    '/js/app.js',
    '/manifest.json',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/apple-touch-icon.png'
];

// External resources to cache
const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@300;400;500;600;700&display=swap'
];

// ============================================
// Install Event
// ============================================

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[ServiceWorker] Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[ServiceWorker] Failed to cache static assets:', error);
            })
    );
});

// ============================================
// Activate Event
// ============================================

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            // Delete old caches that don't match current version
                            return cacheName.startsWith('diana-fitness-') &&
                                cacheName !== STATIC_CACHE_NAME &&
                                cacheName !== DYNAMIC_CACHE_NAME;
                        })
                        .map(cacheName => {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activated');
                return self.clients.claim();
            })
    );
});

// ============================================
// Fetch Event
// ============================================

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Handle Google Fonts specially (cache first, then network)
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then(networkResponse => {
                            return caches.open(DYNAMIC_CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, networkResponse.clone());
                                    return networkResponse;
                                });
                        });
                })
        );
        return;
    }

    // For same-origin requests, use cache-first strategy
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        // Return cached response and update cache in background
                        fetchAndCache(request);
                        return cachedResponse;
                    }
                    // No cache, fetch from network
                    return fetchAndCache(request);
                })
                .catch(() => {
                    // If both cache and network fail, return offline page for HTML
                    if (request.headers.get('accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                })
        );
        return;
    }

    // For cross-origin requests, try network first
    event.respondWith(
        fetch(request)
            .then(response => {
                // Cache successful responses
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE_NAME)
                        .then(cache => {
                            cache.put(request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                // Try cache as fallback
                return caches.match(request);
            })
    );
});

// ============================================
// Helper Functions
// ============================================

function fetchAndCache(request) {
    return fetch(request)
        .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(STATIC_CACHE_NAME)
                .then(cache => {
                    cache.put(request, responseToCache);
                });

            return response;
        });
}

// ============================================
// Background Sync (for future use)
// ============================================

self.addEventListener('sync', event => {
    console.log('[ServiceWorker] Background sync:', event.tag);

    if (event.tag === 'sync-workouts') {
        event.waitUntil(syncWorkouts());
    }
});

async function syncWorkouts() {
    // This would sync workout data when online
    // For now, just log
    console.log('[ServiceWorker] Syncing workouts...');
}

// ============================================
// Push Notifications (for future use)
// ============================================

self.addEventListener('push', event => {
    console.log('[ServiceWorker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'Dags att träna!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'start', title: 'Starta Pass' },
            { action: 'dismiss', title: 'Avfärda' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Diana Fitness', options)
    );
});

self.addEventListener('notificationclick', event => {
    console.log('[ServiceWorker] Notification clicked');
    event.notification.close();

    if (event.action === 'start') {
        event.waitUntil(
            clients.openWindow('/?screen=workout')
        );
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// ============================================
// Message Handler
// ============================================

self.addEventListener('message', event => {
    console.log('[ServiceWorker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});

console.log('[ServiceWorker] Service Worker loaded');
