const cacheName = "sigit-pwa";
const preCache = [
  '/',
  '/script.js',
  '/style.css',
  '/assets/arrow.png',
  '/assets/checkmark.png',
  '/assets/education.png',
  '/assets/email.png',
  '/assets/experience.png',
  '/assets/github.png',
  '/assets/javascript.png',
  '/assets/javascript2.png',
  '/assets/linkedin.png',
  '/assets/me1-modified.webp',
  '/assets/me2.webp',
  '/assets/resume-example.pdf',
  '/mediaqueries.css'
];

self.addEventListener("install", (e) => {
  console.log("Service worker installed");

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(preCache);
    })(),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      const resCache = await cache.match(e.request);

      if (resCache) return resCache;

      try {
        const res = await fetch(e.request);

        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }

        const resToCache = res.clone();
        await cache.put(e.request, resToCache);
        return res;
      } catch (error) {
        console.error("Fetch error:", error);
        // Di sini, Anda bisa mengembalikan respons fallback jika terjadi kesalahan fetching.
      }
    })(),
  );
});
