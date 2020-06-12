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
    { url: '/src/font/font.css', revision: '1' },
    { url: '/src/font/Montserrat-Regular.ttf', revision: '1' },
    { url: '/src/font/Montserrat-Bold.ttf', revision: '1' },
    { url: '/src/font/Material-Icons.woff2', revision: '1' },
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
  ignoreURLParametersMatching: [/.*/],
});


workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  ({ url }) => ['/nav.html', '/index.html', '/detail.html'].includes(url.pathname),
  workbox.strategies.cacheFirst()
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
