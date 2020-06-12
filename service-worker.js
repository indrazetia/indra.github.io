importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/manifest.json', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail.html', revision: '2' },
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
  /https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.cacheFirst({
    cacheName: `api-football`,
  })
);



// const {cacheNames, setCacheNameDetails} = workbox.core;
// const {precacheAndRoute} = workbox.precaching;
// const {registerRoute} = workbox.routing;
// const {StaleWhileRevalidate, CacheFirst} = workbox.strategies;
// const {CacheableResponsePlugin} = workbox.cacheableResponse;

// setCacheNameDetails({
//   prefix: 'api-football',
//   suffix: 'v1',
//   precache: 'app-shell',
//   runtime: 'external-resource',
// });

// function apply(context, files) {
//   return files.map(([file, revision]) => ({
//     url: context + file,
//     revision,
//   }));
// }

// function getPrecacheList() {
//   const icons = [
//     'favicon.ico',
//     'icon-72.png',
//     'icon-96.png',
//     'icon-128.png',
//     'icon-144.png',
//     'icon-152.png',
//     'icon-192.png',
//     'icon-384.png',
//     'icon-512.png',
//   ].map((icon) => [icon, 1]);

//   const material = [
//     ['css/materialize.min.css', 1],
//     ['js/materialize.min.js', 1],
//   ];
//   const fonts = [
//     ['font.css',1],
//     ['Montserrat-Regular.ttf', 1],
//     ['Montserrat-Bold.ttf', 1],
//     ['Material-Icons.woff2', 1],
//   ];
//   const mains = [
//     ['api.js', 1],
//     ['descrip.js', 1],
//     ['nav.js', 1],
//   ];


//   const services = [
//     ['db.js', 1],
//     ['idb.js', 1],
//     ['register_worker.js', 1]
//   ];

//   return [
//     {url: '/index.html', revision: 1},
//     {url: '/detail.html', revision: 1},
//     {url: '/nav.html', revision: 1},
//     {url: '/manifest.json', revision: 1},
//     { url: '/pages/home.html', revision: 1 },
//     { url: '/pages/premier.html', revision: 1 },
//     { url: '/pages/saved.html', revision: 1 },
//     apply('/assets/icon/', icons),
//     apply('/src/', material),
//     apply('/src/font/', fonts),
//     apply('/src/main/', mains),
//     apply('/src/services/', services),
//   ].flat();
// }

// precacheAndRoute(getPrecacheList(),{ignoreURLParametersMatching: [/.*/]});

// workbox.routing.registerRoute(
//   new RegExp('/pages/'),
//     workbox.strategies.staleWhileRevalidate({
//         cacheName: 'pages'
//     })
// );
 
// registerRoute(
//   /https:\/\/api\.football-data\.org\/v2/,
//   new StaleWhileRevalidate({
//     cacheName: `${cacheNames.prefix}-api-resource-${cacheNames.suffix}`,
//   }),
// );
// registerRoute(
//     ({request}) => request.destination === 'image',
//     new CacheFirst({
//       plugins: [
//         new CacheableResponsePlugin({
//           statuses: [0, 200],
//         }),
//       ],
//     }),
// );
    

// const CACHE_NAME = "football-league";

// let urlsToCache = [
//   "/",
//   "/manifest.json",
//   "/nav.html",
//   "/detail.html",
//   "/index.html",
//   "/pages/home.html",
//   "/pages/premier.html",
//   "/pages/saved.html",
//   "/src/css/materialize.min.css",
//   "/src/font/font.css",
//   "/src/font/Montserrat-Regular.ttf",
//   "/src/font/Montserrat-Bold.ttf",
//   "/src/font/Material-Icons.woff2",
//   "/assets/icon/icon-72.png",
//   "/assets/icon/favicon.ico",
//   "/assets/icon/icon-96.png",
//   "/assets/icon/icon-128.png",
//   "/assets/icon/icon-144.png",
//   "/assets/icon/icon-152.png",
//   "/assets/icon/icon-192.png",
//   "/assets/icon/icon-384.png",
//   "/assets/icon/icon-512.png",
//   "/src/main/api.js",
//   "/src/services/db.js",
//   "/src/services/idb.js",
//   "/src/js/materialize.min.js",
//   "/src/main/nav.js",
//   "/src/main/descrip.js",
//   "/src/services/register_worker.js"
// ];
 
// self.addEventListener("install", function (event) {
//   self.skipWaiting();
//   event.waitUntil(
//       caches.open(CACHE_NAME).then(function(cache) {
//           return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//           return Promise.all(
//               cacheNames.map(function(cacheName) {
//                   if (cacheName !== CACHE_NAME) {
//                       console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                       return caches.delete(cacheName);
//                   }
//               })
//           );
//       })
//   );
// });

// self.addEventListener("fetch", function(event) {
//   const base_url = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//       event.respondWith(
//           caches.open(CACHE_NAME).then(function(cache) {
//               return fetch(event.request).then(function(response) {
//                   cache.put(event.request.url, response.clone());
//                   return response;
//               })
//           })
//       );
//   } else {
//       event.respondWith(
//           caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
//               return response || fetch (event.request);
//           })
//       )
//   }
// });

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