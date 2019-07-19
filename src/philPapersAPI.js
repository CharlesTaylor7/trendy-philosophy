import parser from 'fast-xml-parser';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import * as Rx from 'rxjs/operators';
const xml = parser;

const regex = /[A-Z0-9-]+$/;
const getRecordId = record => record.header.identifier.match(regex)[0];

export const records$ = fromFetch(`https://philpapers.org/oai.pl?verb=ListRecords&metadataPrefix=oai_dc`)
  .pipe(
    Rx.flatMap(response => response.text()),
    Rx.flatMap(text => {
      const { record, resumptionToken } = xml.parse(text)['OAI-PMH'].ListRecords;

      return record;
    }),
    Rx.map(getRecordId),
    Rx.map(console.log)
  );

records$.subscribe({
  next: result => console.log(result),
  complete: () => console.log('done')
})

const apiId = '904518';
const apiKey = '5KLo4qkvXNl4t8s5';

export const fetchCategories = () => fetch(`https://philpapers.org/philpapers/raw/categories.json?apiId=${apiId}&apiKey=${apiKey}`)
  .then(response => response.json());
