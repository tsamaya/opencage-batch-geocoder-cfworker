/* eslint-disable no-console */
import batch from './batch';
import { parallelForEach } from './utils';

const batchGeoJSON = async request => {
  const { key, q } = await request.json();
  const arrq = q.split('\n');
  console.log(arrq);

  const all = await batch(arrq, key);

  const arr = [];
  await parallelForEach(all, result => {
    if (result && result.geometry) {
      const { lat, lng } = result.geometry;
      arr.push({
        type: 'Feature',
        properties: {
          formatted: result.formatted,
          ...result.components
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      });
    }
  });

  // console.log(arr);

  const headers = {
    'Content-Type': 'application/json'
  };

  // eslint-disable-next-line no-undef
  return new Response(JSON.stringify(arr), { headers });
};

export default batchGeoJSON;
