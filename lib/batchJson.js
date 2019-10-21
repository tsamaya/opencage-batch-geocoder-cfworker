/* eslint-disable no-console */
import batch from './batch';

const batchJson = async request => {
  const { key, q } = await request.json();
  const arrq = q.split('\n');
  console.log(arrq);

  const all = await batch(arrq, key);

  const headers = { 'Content-Type': 'application/json' };
  // eslint-disable-next-line no-undef
  return new Response(JSON.stringify(all), { headers });
  // return new Response('Hello worker!', { status: 200 });
};

export default batchJson;
