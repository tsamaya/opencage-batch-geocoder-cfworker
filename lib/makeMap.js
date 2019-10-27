import getMap from './views/map';

const makeMap = arr => {
  const geoJson = JSON.stringify(arr);
  return getMap(geoJson);
};

export default makeMap;
