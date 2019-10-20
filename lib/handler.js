import landing from './landing';
import batch from './batch';
/**
 * Fetch and log a request
 * @param {Request} request
 */
const handleRequest = async request => {
  if (request.method === 'POST') {
    // response = new Response('Hello worker!', { status: 200 });
    return await batch(request);
  }
  return new Response(landing, {
    headers: { 'Content-Type': 'text/html' },
  });
};

export default handleRequest;
