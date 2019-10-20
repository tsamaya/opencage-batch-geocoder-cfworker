import Router from './router';
import landing from './landing';
import batchJson from './batchJson';
import batchMap from './batchMap';

/**
 * Fetch and log a request
 * @param {Request} request
 */
const handleRequest = async request => {
  const r = new Router();
  // Replace with the approriate paths and handlers
  r.post('/map', async req => await batchMap(req));
  r.post('/', async req => await batchJson(req)); // return the response from the origin
  r.get(
    '/',
    () =>
      new Response(landing, {
        headers: { 'Content-Type': 'text/html' },
      }),
  ); // return a default message for the root route

  const response = await r.route(request);
  return response;
};

export default handleRequest;
