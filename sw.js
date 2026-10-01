const CACHE_NAME = 'scandi-v5';
const ASSETS = ['./', './index.html', './recipes.js', './recipes-soups.js', './recipes-baking.js'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        )
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.open(CACHE_NAME).then(cache =>
            cache.match(e.request).then(res => res || fetch(e.request))
        )
    );
});
