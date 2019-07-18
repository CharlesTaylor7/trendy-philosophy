import parser from 'fast-xml-parser';
import { take, map, delay, mergeAll } from 'rxjs/operators';

export const fetchRecords = () => fetch(`https://philpapers.org/oai.pl?verb=ListRecords&metadataPrefix=oai_dc`)
  .then(response => response.text())
  .then(text => parser.parse(text))
  .then(console.log);

const apiId = '904518';
const apiKey = '5KLo4qkvXNl4t8s5';

export const fetchCategories = () => fetch(`https://philpapers.org/philpapers/raw/categories.json?apiId=${apiId}&apiKey=${apiKey}`)
  .then(response => response.json());
