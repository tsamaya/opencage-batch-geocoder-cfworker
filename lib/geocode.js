import { API_KEY } from '../env';

const geocode = async request => {
  const { q } = await request.json();
  const headers = { 'Content-Type': 'application/json' };
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=Brandenburg%20Gate`,
  );
  const data = await response.json();
  return new Response(JSON.stringify(data), { headers });
};

export default geocode;
