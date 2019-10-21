export const parallelForEach = async (iterable, fn) => {
  await Promise.all(
    iterable.map(async (elem, index) => {
      try {
        await fn(elem, index, iterable);
      } catch (error) {
        // TODO : find an elegant wait to deal with rejections
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })
  );
};

export const isEmpty = str => !str || !str.length;
