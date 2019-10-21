/* eslint-disable no-console */
const geocode = async request => {
  const { key, q } = request;
  // eslint-disable-next-line no-undef
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${q}&no_annotations=1`
  );
  if (!response.ok) {
    console.log(`error ${response.status} ${response.statusText}`);
    return {};
  }
  return response.json();
};

export default geocode;
