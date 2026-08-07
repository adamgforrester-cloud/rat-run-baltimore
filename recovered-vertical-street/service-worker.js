
const CACHE = "rat-run-baltimore-zone-correction-v4";
const FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/main.js",
  "./js/game.js",
  "./js/audio.js",
  "./js/leaderboard.js",
  "./public/assets/baltimore-street.webp",
  "./public/assets/baltimore-downtown.webp",
  "./public/assets/baltimore-harbor-v3.webp",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy=response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request,copy));
    return response;
  }).catch(() => caches.match(event.request)));
});
