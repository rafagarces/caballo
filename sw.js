const CACHE = "caballo-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./svg/Vector00.svg",
  "./svg/Vector01.svg",
  "./svg/Vector02.svg",
  "./svg/Vector03.svg",
  "./svg/Vector04.svg",
  "./svg/Vector05.svg",
  "./audio/01.ogg",
  "./audio/02.ogg",
  "./audio/05.ogg",
  "./audio/01.mp3",
  "./audio/02.mp3",
  "./audio/05.mp3",
  "./fonts/Neue Pixel Grotesk.ttf",
  "./fonts/HelveticaNeue.ttc",
  "./texture/Grain.png",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
