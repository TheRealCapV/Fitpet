// FitPet Service Worker — handles background rest timer notifications
self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

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
