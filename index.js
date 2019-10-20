addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

import { API_KEY } from './env';

const landing = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>OpenCage batch Geocoder</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
    />
    <script
      defer
      src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
    ></script>
  </head>
  <body>
    <section class="section">
      <div class="container">
        <h1 class="title">
          OpenCage Geocoder
        </h1>
        <div class="columns is-mobile">
          <div class="column">
            <div class="field">
              <label class="label">API Key</label>
              <div class="control">
                <input
                  id="key"
                  class="input"
                  type="text"
                  placeholder="API Key"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Address</label>
              <div class="control">
                <input
                  id="address"
                  class="input"
                  type="text"
                  placeholder="Address"
                  value="Brandenburg Gate"
                />
              </div>
            </div>

            <button class="button is-primary" onclick="geocode()">
              Geocode
            </button>
          </div>

          <div class="column">
            <pre id="response"></pre>
          </div>
        </div>
      </div>
    </section>
    <script>
      async function geocode() {
        const response = await fetch(window.location.pathname, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: document.querySelector('#address').value,
            key: document.querySelector('#key').value,
          }),
        });
        const data = await response.json();
        console.log(data);
        document.querySelector('#response').innerHTML = JSON.stringify(
          data,
          null,
          '  ',
        );
      }
    </script>
  </body>
</html>
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
