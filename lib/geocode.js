const geocode = async request => {
  const { key, q } = request;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${q}&no_annotations=1`,
  );
  if (!response.ok) {
    console.log(`error ${response.status} ${response.statusText}`);
    return {};
  }
  return await response.json();
};

export default geocode;
