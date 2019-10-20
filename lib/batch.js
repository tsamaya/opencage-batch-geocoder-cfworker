import geocode from './geocode';

const parallelForEach = async (iterable, fn) => {
  await Promise.all(
    iterable.map(async (elem, index) => {
      try {
        await fn(elem, index, iterable);
      } catch (error) {
        // TODO : find an elegant wait to deal with rejections
        console.error(error);
      }
    }),
  );
};

const batch = async request => {
  const { key, q } = await request.json();
  const all = [];
  const arrq = q.split('\n');
  console.log(arrq);
  await parallelForEach(arrq, async element => {
    const response = await geocode({ q: element, key });
    const { results } = response;
    if (results)
      results.forEach(element => {
        all.push(element);
      });
  });
  const headers = { 'Content-Type': 'application/json' };
  return new Response(JSON.stringify(all), { headers });
  // return new Response('Hello worker!', { status: 200 });
};

export default batch;
