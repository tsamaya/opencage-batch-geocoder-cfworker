addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

import { API_KEY } from './env';

const landing = `
<h1>OpenCage Geocoder</h1>
<p>Enter an address:</p>
<input type="text" id="address" value="Brandenburg Gate"></input>
<button onclick='geocode()'>Geocode</button>
<pre id="response"></pre>

<script>
  async function geocode() {
    const response = await fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: document.querySelector("#address").value })
    });
    const data = await response.json();
    console.log(data);
    document.querySelector("#response").innerHTML = JSON.stringify(data, null, '  ')
  }
</script>
`;

const geocode = async request => {
  const { q } = await request.json();
  const headers = { 'Content-Type': 'application/json' };
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=Brandenburg%20Gate`,
  );
  const data = await response.json();
  return new Response(JSON.stringify(data), { headers });
};

/**
 * Fetch and log a request
 * @param {Request} request
 */
const handleRequest = async request => {
  let response;
  if (request.method === 'POST') {
    // response = new Response('Hello worker!', { status: 200 });
    response = await geocode(request);
  } else {
    response = new Response(landing, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
  return response;
};
