const CACHE = "anak-kamar-shell-v2";
const OFFLINE_URL = "/offline";
const SHELL = [OFFLINE_URL, "/icon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

/**
 * Network-first, offline-fallback-only. We deliberately don't runtime-cache
 * JS/CSS/data — those are hashed per build, and a stale service worker
 * caching them cache-first was serving mismatched chunks across deploys
 * (the exact "feels heavy/glitchy switching pages" symptom). Vercel already
 * sends long-lived immutable Cache-Control on hashed assets, so the browser
 * HTTP cache covers the performance case without the staleness risk.
 */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (!SHELL.includes(url.pathname)) return;

  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
