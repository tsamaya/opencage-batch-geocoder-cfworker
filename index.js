import handleRequest from './lib/handler';

// eslint-disable-next-line
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
