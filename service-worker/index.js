import {
  INDEX_HTML_PATH,
  ENVIRONMENT,
  VERSION,
  INDEX_EXCLUDE_SCOPE,
  INDEX_INCLUDE_SCOPE,
  REQUEST_TIMEOUT_CACHED,
  REQUEST_TIMEOUT_UNCACHED

} from 'ember-service-worker-index-fallback/service-worker/config';

import { urlMatchesAnyPattern } from 'ember-service-worker/service-worker/url-utils';
import cleanupCaches from 'ember-service-worker/service-worker/cleanup-caches';

const CACHE_KEY_PREFIX = 'esw-index';
const CACHE_NAME = `${CACHE_KEY_PREFIX}-${VERSION}`;

const INDEX_HTML_URL = new URL(INDEX_HTML_PATH, self.location).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    fetch(INDEX_HTML_URL, { credentials: 'include' }).then((response) => {
      return caches
        .open(CACHE_NAME)
        .then((cache) => cache.put(INDEX_HTML_URL, response));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME));
});

self.addEventListener('fetch', (event) => {
  let request = event.request;
  let url = new URL(request.url);
  let isGETRequest = request.method === 'GET';
  let isHTMLRequest = request.headers.get('accept').indexOf('text/html') !== -1;
  let isLocal = url.origin === location.origin;
  let scopeExcluded = urlMatchesAnyPattern(request.url, INDEX_EXCLUDE_SCOPE);
  let scopeIncluded = !INDEX_INCLUDE_SCOPE.length || urlMatchesAnyPattern(request.url, INDEX_INCLUDE_SCOPE);
  let isTests = url.pathname === '/tests' && ENVIRONMENT === 'development';

  if (!isTests && isGETRequest && isHTMLRequest && isLocal && scopeIncluded && !scopeExcluded) {

    event.respondWith(new Promise(function (fulfill, reject) {
      caches.match(INDEX_HTML_URL, { cacheName: CACHE_NAME }).then((cachedResponse) => {
        const timeout = cachedResponse ? REQUEST_TIMEOUT_CACHED : REQUEST_TIMEOUT_UNCACHED;

        fromNetwork(request, timeout).then((response) => {
          fulfill(response);
        }, (error) => {
          fulfill(cachedResponse);
        });
      })
    }));
  }
});

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {

    var timeoutId = setTimeout(reject, timeout);

    fetch(request, { credentials: 'include' }).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response.clone());
    }, reject);
  });
}
