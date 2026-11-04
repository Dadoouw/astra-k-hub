const CACHE='astra-k-hub-v2';
const FILES=['./','./index.html','./style.css?v=2','./app.js?v=2','./manifest.webmanifest','./icon.svg','./astra-black-hero.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
