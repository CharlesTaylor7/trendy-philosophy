import parser from 'fast-xml-parser';
import { fromFetch } from 'rxjs/fetch';
import * as Rx from 'rxjs/operators';
import * as Observable from 'rxjs';

const xml = parser;

const regex = /[A-Z0-9-]+$/;
const getRecordId = record => record.header.identifier.match(regex)[0];

const escapeCharacter = char => {
  switch (char) {
    case '/': return '%2F';
    case '?': return '%3F';
    case '#': return '%23';
    case '=': return '%3D';
    case ':': return '%3A';
    case ';': return '%3B';
    case ' ': return '%20';
    case '%': return '%25';
    case '+': return '%2B';
    default: return char;
  }
};
const escape = token => token.split().map(escapeCharacter).join();

const nextRecordSet$ = (token) => fromFetch(`https://philpapers.org/oai.pl?verb=ListRecords&metadataPrefix=oai_dc${token ? `&resumptionToken=${escape(token)}` : ''}`)
  .pipe(
    Rx.flatMap(response => response.text()),
    Rx.flatMap(text => {
      const {
        record: records,
        resumptionToken,
      } = xml.parse(text)['OAI-PMH'].ListRecords;
      return Observable.merge(
        Observable.from(records),
        nextRecordSet$(resumptionToken)
      );
    })
  );

const record$ = nextRecordSet$()
  .pipe(
    Rx.map(getRecordId),
  );

record$.subscribe({
  next: result => console.log(result),
  complete: () => console.log('done')
})

const apiId = '904518';
const apiKey = '5KLo4qkvXNl4t8s5';

export const fetchCategories = () => fetch(`https://philpapers.org/philpapers/raw/categories.json?apiId=${apiId}&apiKey=${apiKey}`)
  .then(response => response.json());
