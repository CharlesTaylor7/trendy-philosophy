import { useState, useEffect } from 'react';
import * as R from 'ramda';
import stemmer from 'lancaster-stemmer';

const blackList = /^([0-9]+|s|a|aa|at|an|the|of|on|and|to|in|for)$/;
const splitOn = /[\-\[\]\s,.–_'’();:/"”]/;
const propNames = ['title', 'description'];
const getWords = record =>
  R.pipe(
    R.chain(propName =>
      record[propName]
      ? record[propName].split(splitOn)
      : []),
    R.map(stemmer),
    R.filter(stem =>
      !R.isEmpty(stem) &&
      R.isEmpty(R.match(blackList, stem))),
    R.uniq,
  )(propNames);

export const useRecordSets = (recordSet$) => {
  // state: { lookup: { [stem: string]: RecordId[] }, recordCount: number }
  // where RecordId = string
  // a map from word stems to a list of records containing that stem.
  // The frequency of a stem is size of its dictionary entry divided by the record count.
  const [ state, setState ] = useState({
    records: {},
    stemsToRecords: {},
    yearsToRecords: {},
  });

  useEffect(() => {
    recordSet$.subscribe(recordSet => {

      setState(state => {
        const { stemsToRecords, yearsToRecords, records } = state;

        const updatedRecords = { ...records };
        for (const record of recordSet) {
          updatedRecords[record.id] = record;
        }

        const stems = { ...stemsToRecords };
        for (const record of recordSet) {
          for (const word of getWords(record)) {
            if (stems[word] === undefined) {
              stems[word] = [record.id];
            } else {
              stems[word] = [...stems[word], record.id];
            }
          }
        }

        const years = { ...yearsToRecords };
        for (const record of recordSet) {
          const { year } = record;
          if (years[year] === undefined) {
            years[year] = [record.id];
          } else {
            years[year] = [...years[year], record.id];
          }
        }

        return {
          records: updatedRecords,
          stemsToRecords: stems,
          yearsToRecords: years,
        };
      });
    });
  }, [recordSet$]);

  return state;
};
