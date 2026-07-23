// FitPet Service Worker — app-shell caching + background rest timer notifications
const CACHE = 'fitpet-shell-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
  // Warm the cache with the app shell so the very first reload-after-eviction is instant too.
  e.waitUntil(caches.open(CACHE).then(c => c.add('./').catch(() => {})));
});
self.addEventListener('activate', e => e.waitUntil((async () => {
  // Drop any old cache versions, then take control of open pages
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));

// Static assets (pets art, sounds, icons) are content-stable and huge, so they stay
// cache-first — a reload at the gym is instant instead of re-downloading over cellular.
//
// The app shell itself (the HTML document) is NETWORK-FIRST. Serving it cache-first
// meant every code change took two reloads to appear, so a device could sit on a
// stale build indefinitely and look like fixes "didn't work". We now fetch fresh
// HTML when the network allows and fall back to cache only when offline.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;   // never touch AdSense / cross-origin

  const isDoc = req.mode === 'navigate'
    || (req.destination === 'document')
    || /\.html?$/i.test(url.pathname)
    || url.pathname.endsWith('/');

  if (isDoc) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
        return res;
      } catch (_) {
        // Offline — fall back to whatever shell we have
        return (await cache.match(req, { ignoreSearch: true }))
            || (await cache.match('./', { ignoreSearch: true }))
            || Response.error();
      }
    })());
    return;
  }

  // Everything else: stale-while-revalidate
  e.respondWith((async () => {
    const cache  = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  })());
});

let _notifTimer = null;
let _pendingNotif = false; // true after timer ends, waiting for app to be backgrounded

async function showRestNotif() {
  await self.registration.showNotification('FitPet — Rest Over! 💪', {
    body:     'Time to hit your next set!',
    icon:     'pets/rhino_t0.png',
    badge:    'pets/rhino_t0.png',
    tag:      'fitpet-rest-timer',
    renotify: true,
    vibrate:  [200, 100, 200],
    silent:   false
  });
}

self.addEventListener('message', async e => {
  const { type, fireAt } = e.data || {};

  if (type === 'SCHEDULE_NOTIF') {
    // Schedule for background — fires when timer ends regardless of visibility
    _pendingNotif = false;
    if (_notifTimer) { clearTimeout(_notifTimer); _notifTimer = null; }
    const delay = Math.max(0, fireAt - Date.now());
    _notifTimer = setTimeout(async () => {
      _notifTimer = null;
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const anyVisible = clients.some(c => c.visibilityState === 'visible');
      if (anyVisible) {
        // App is open — mark pending so we fire when they background
        _pendingNotif = true;
      } else {
        await showRestNotif();
      }
    }, delay);
  }

  if (type === 'CANCEL_NOTIF') {
    _pendingNotif = false;
    if (_notifTimer) { clearTimeout(_notifTimer); _notifTimer = null; }
  }

  // App just went to background — fire pending notification immediately
  if (type === 'APP_HIDDEN') {
    if (_pendingNotif) {
      _pendingNotif = false;
      await showRestNotif();
    }
  }
});

// Tapping the notification opens the app and navigates to the workout log
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      if (clients.length) {
        const client = clients[0];
        client.focus();
        // Post message to tell the app to show the log page
        client.postMessage({ type: 'OPEN_LOG' });
        return;
      }
      // App not open — open it with a hash so it can navigate on load
      self.clients.openWindow('./index.html#log');
    })
  );
});
