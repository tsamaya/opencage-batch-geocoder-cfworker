import Router from './router';
import landing from './views/landing';
import batchJson from './batchJson';
import batchMap from './batchMap';

/**
 * Fetch and log a request
 * @param {Request} request
 */
const handleRequest = async request => {
  const r = new Router();
  // Returns a leaflet map on POST on /mpa
  r.post('/map', async req => batchMap(req));
  // returns a JSON obkect on POST on /
  r.post('/', async req => batchJson(req));
  // returns a landing page with a test HTML form
  r.get(
    '/',
    () =>
      // eslint-disable-next-line no-undef
      new Response(landing, {
        headers: { 'Content-Type': 'text/html' }
      })
  );
  const response = await r.route(request);
  return response;
};

export default handleRequest;
