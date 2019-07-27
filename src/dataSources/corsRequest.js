import { fromFetch } from 'rxjs/fetch';

let corsAnywhere = 'https://cors-holy-water.herokuapp.com/';
// let corsAnywhere = '';

export const corsRequest = async url => {
  try {
    const response = await fetch(`${corsAnywhere}${url}`);
    return response;
  } catch {
    corsAnywhere = '';
    console.log('Cors proxy failed.');
  }
  return fetch(`${corsAnywhere}${url}`);
}