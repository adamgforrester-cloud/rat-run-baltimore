const CACHE='rat-run-baltimore-v25';
const ASSETS=['./','./index.html','./manifest.webmanifest','./leaderboard-config.js','./CHANGELOG.md','./icons/icon-192.png','./icons/icon-512.png','./assets/adam-runner.png','./assets/giant-cheese.svg','./assets/coffee.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
