import parser from 'fast-xml-parser';
import * as Rx from 'rxjs/operators';
import * as Observable from 'rxjs';
import { observeCorsRequest } from './corsRequest';
const xml = parser;

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

const getTokenSuffix = token =>
  token
  ? `&resumptionToken=${escape(token)}`
  : '';

export const getRecordSet$ = (token) =>
  observeCorsRequest(
      `https://philpapers.org/oai.pl?verb=ListRecords&metadataPrefix=oai_dc${getTokenSuffix(token)}`)
  .pipe(
    Rx.flatMap(response => response.text()),
    Rx.flatMap(text => {
      const {
        record: records,
        resumptionToken: token,
      } = xml.parse(text)['OAI-PMH'].ListRecords;

      return Observable.concat(
        [records],
        getRecordSet$(token)
      );
    })
  );

const getLastPartOfPath = path => path.match(/^.*\/(?<key>.*)$/).groups.key;
const getPropName = dcPropName => dcPropName.match(/^dc:(?<prop>\w+)$/).groups.prop;

const getRecordMetadata = record => {
  const metadata = {};
  for (const [key, value] of Object.entries(record.metadata['oai_dc:dc'])) {
    const prop = getPropName(key);
    metadata[prop] = value;
  }

  metadata.title = metadata.title ? String(metadata.title) : null;
  metadata.id = getLastPartOfPath(metadata.identifier);
  delete metadata.identifier;

  metadata.year = metadata.date;
  delete metadata.date;

  metadata.type = getLastPartOfPath(metadata.type);

  metadata.author = metadata.creator;
  delete metadata.creator;

  return metadata;
}

export const recordSet$ = getRecordSet$()
  .pipe(
    Rx.map(recordSet =>
      recordSet
        .map(getRecordMetadata)
        .filter(record =>
          record.language === 'en' &&
          record.title &&
          typeof record.year === 'number'
        ),
    ),
  );
recordSet$.subscribe(console.log);
// ToDo: Figure out how to parse and decompress data from archive.
const getDoc = id => observeCorsRequest(`https://philPapers.org/archive/${id}`);

const apiId = '904518';
const apiKey = '5KLo4qkvXNl4t8s5';

export const category$ =
  observeCorsRequest(
      `https://philPapers.org/philpapers/raw/categories.json?apiId=${apiId}&apiKey=${apiKey}`)
  .pipe(
    Rx.flatMap(response => response.json()),
    Rx.map(array => array[0])
  );
