import geocode from './geocode';
import { isEmpty, parallelForEach } from './utils';

const batch = async (arrq, key) => {
  const all = [];
  await parallelForEach(arrq, async element => {
    if (!isEmpty(element)) {
      const response = await geocode({ q: element, key });
      const { results } = response;
      if (results)
        results.forEach(res => {
          all.push(res);
        });
    }
  });
  return all;
};

export default batch;
