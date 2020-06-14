importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/manifest.json', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/premier.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/src/css/materialize.min.css', revision: '1' },
    { url: '/assets/icon/icon-72.png', revision: '1' },
    { url: '/assets/icon/favicon.ico', revision: '1' },
    { url: '/assets/icon/icon-96.png', revision: '1' },
    { url: '/assets/icon/icon-128.png', revision: '1' },
    { url: '/assets/icon/icon-144.png', revision: '1' },
    { url: '/assets/icon/icon-152.png', revision: '1' },
    { url: '/assets/icon/icon-192.png', revision: '1' },
    { url: '/assets/icon/icon-384.png', revision: '1' },
    { url: '/assets/icon/icon-512.png', revision: '1' },
    { url: '/src/main/api.js', revision: '1' },
    { url: '/src/services/db.js', revision: '1' },
    { url: '/src/services/idb.js', revision: '1' },
    { url: '/src/js/materialize.min.js', revision: '1' },
    { url: '/src/main/nav.js', revision: '1' },
    { url: '/src/main/descrip.js', revision: '1' },
    { url: '/src/services/register_worker.js', revision: '1' },
], {
  // Ignore all URL parameters.
  ignoreUrlParametersMatching: [/.*/],
});


workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  /\.(?:png|ico)$/,
  ({ url }) => ['/nav.html', '/index.html', '/detail.html'].includes(url.pathname),
  workbox.strategies.cacheFirst()
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-style',
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts-style',
      plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 30,
          }),
      ],
  })
);

 
workbox.routing.registerRoute(
  /https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.cacheFirst({
    cacheName: `api-football`,
  })
);
self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    event.waitUntil(
      self.registration.showNotification('Push Notification', {
        body: body,
        icon: 'assets/icon/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      }),
    );
});
