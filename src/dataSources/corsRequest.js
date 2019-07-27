import { fromFetch } from 'rxjs/fetch';

const corsAnywhere = 'https://cors-holy-water.herokuapp.com/';

const isProduction = process.env.NODE_ENV === "production";
export const observeCorsRequest = url =>
  isProduction
  ? fromFetch(`${corsAnywhere}${url}`)
  : fromFetch(url);