const html = str => `
<!DOCTYPE html>
<html>
  <head>
    <title>Opencage data batch geocoder map</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
    />
    <style>
      html,
      body,
      #map {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      #map {
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"></script>
    <script>
      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      var group = L.layerGroup().addTo(map);
      var arr = ${str};
      for (var i = 0; i < arr.length; i++) {
        group.addLayer(L.marker(arr[i]));
      }
      map.fitBounds(L.latLngBounds(arr));
    </script>
  </body>
</html>
`;

const makeMap = arr => {
  let str = '[';
  for (let i = 0; i < arr.length; i += 1) {
    str = `${str}[${arr[i][0]},${arr[i][1]}]`;
  }
  str = `${str}]`;
  return html(str);
};

export default makeMap;
