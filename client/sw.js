var CACHE_NAME = 'bm-v1';

var urlsToCache = [
  'index.html',
  'js/main.js',
  '/bower_components/paho-mqtt-js/mqttws31.js',
  '/node_modules/vue/dist/vue.min.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function (err) {
        console.log('error: ', err);
      })
  );
}, false);

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) { // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
  );
}, false);


/**
 * Remove caches in service worker that are no longer used.
 */
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});