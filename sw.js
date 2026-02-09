const CACHE_NAME = 'esl-connect-v1';
const ASSETS_TO_CACHE = [
    'index.html',
    'dashboard.html',
    'css/styles.css',
    'js/auth.js',
    'js/dashboard.js',
    'js/supabase-config.js',
    'logo.svg'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Pre-caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    console.log('SW: Service Worker Activated');
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
