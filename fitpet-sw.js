// FitPet Service Worker — handles background rest timer notifications
self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

let _notifTimer = null;

self.addEventListener('message', e => {
  const { type, fireAt, title, body } = e.data || {};

  if (type === 'SCHEDULE_NOTIF') {
    // Cancel any existing scheduled notification
    if (_notifTimer) { clearTimeout(_notifTimer); _notifTimer = null; }
    const delay = Math.max(0, fireAt - Date.now());
    _notifTimer = setTimeout(async () => {
      _notifTimer = null;
      // Only fire if no client (tab/app) is currently visible
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const anyVisible = clients.some(c => c.visibilityState === 'visible');
      // Always show notification — if app is open, it'll handle its own toast;
      // this ensures it fires even when backgrounded
      await self.registration.showNotification(title || 'FitPet — Rest Over! 💪', {
        body:     body  || 'Time to hit your next set!',
        icon:     'pets/rhino_t0.png',
        badge:    'pets/rhino_t0.png',
        tag:      'fitpet-rest-timer',
        renotify: true,
        vibrate:  [200, 100, 200],
        silent:   false
      });
    }, delay);
  }

  if (type === 'CANCEL_NOTIF') {
    if (_notifTimer) { clearTimeout(_notifTimer); _notifTimer = null; }
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
