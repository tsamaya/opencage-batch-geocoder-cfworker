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
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
    />
  </head>
  <body>
    <section class="section">
      <div class="container">
        <h1 class="title">
          OpenCage Batch Geocoder
        </h1>
        <div class="columns">
          <div class="column is-one-third">
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
              <label class="label">Addresses and coordinates</label>
              <div class="control">
                <textarea
                  id="query"
                  class="textarea"
                  placeholder="Brandenburg Gate"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <div>
              <button class="button is-primary" onclick="geocode()">
                Batch Geocode => Json
              </button>
              <button class="button is-primary" onclick="map_geocode()">
                Batch Geocode => Map
              </button>
            </div>
          </div>

          <div class="column is-two-thirds">
            <pre id="response"></pre>
            <div id="map"></div>
          </div>
        </div>
      </div>
    </section>
    <script
      defer
      src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
    ></script>
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"></script>
    <script>
      async function geocode() {
        document.querySelector('#response').innerHTML = '';
        const response = await fetch(window.location.pathname, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              q: document.querySelector('#query').value,
              key: document.querySelector('#key').value
            })
          }
        );
        const data = await response.json();
        console.log(data);
        document.querySelector('#response').innerHTML = JSON.stringify(
          data,
          null,
          '  '
        );
      }
      async function map_geocode() {
        document.querySelector('#response').innerHTML = '';
        const url = window.location.pathname + 'geojson';
        console.log(url);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: document.querySelector('#query').value,
            key: document.querySelector('#key').value
          })
        });
        const data = await response.text();
        console.log(data);
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var myLayer = L.geoJSON(null, {
          onEachFeature: function(f, l) {
            l.bindPopup(
              '<pre>' +
                JSON.stringify(f.properties, null, ' ').replace(
                  /[\\{\\}"]/g,
                  ''
                ) +
                '</pre>'
            );
          }
        }).addTo(map);

        var geojsonFeatures = data;
        myLayer.addData(geojsonFeatures);

        map.fitBounds(myLayer.getBounds());
      }
    </script>
    <script></script>
  </body>
</html>

`;

export default landing;
