// Retire the previous build's offline cache during the Classic restoration.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await self.registration.unregister();
    const tabs = await self.clients.matchAll({type: 'window'});
    for (const tab of tabs) await tab.navigate(tab.url);
  })());
});
