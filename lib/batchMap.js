/* eslint-disable no-console */
import batch from './batch';
import makeMap from './views/map';
import { parallelForEach } from './utils';

const batchMap = async request => {
  const { key, q } = await request.json();
  const arrq = q.split('\n');
  console.log(arrq);

  const all = await batch(arrq, key);

  const arr = [];
  await parallelForEach(all, result => {
    if (result && result.geometry) {
      const { lat, lng } = result.geometry;
      arr.push([lat, lng]);
    }
  });

  console.log(arr);
  // eslint-disable-next-line no-undef
  return new Response(makeMap(arr), {
    headers: { 'Content-Type': 'text/html' }
  });
};

export default batchMap;
