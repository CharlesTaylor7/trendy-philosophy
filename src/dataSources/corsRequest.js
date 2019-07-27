let corsAnywhere = 'https://cors-holy-water.herokuapp.com/';

const goFetch = url => fetch(`${corsAnywhere}${url}`, {
  headers: {
    // origin: 'localhost:3000'
    'X-Requested-With': '*',
  },
});

export const corsRequest = async url => {
  let response;
  try {
    response = await goFetch(url);
    if (response.status.toFixed(0)[0] !== 2) throw new Error();
  } catch {
    corsAnywhere = '';
    console.log('Cors proxy failed.');
    response = await goFetch(url);
  }
  return response;
}