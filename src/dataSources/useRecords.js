import { useState, useEffect, useRef } from 'react';
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
  const state = useRef({
    records: {},
    stemsToRecords: {},
    yearsToRecords: {},
  });
  const [recordCount, setRecordCount] = useState(0);

  useEffect(() => {
    const subscription = recordSet$.subscribe(recordSet => {

      const {
        records,
        stemsToRecords,
        yearsToRecords,
      } = state.current;

      for (const record of recordSet) {
        records[record.id] = record;
      }

      for (const record of recordSet) {
        for (const word of getWords(record)) {
          if (stemsToRecords[word] === undefined) {
            stemsToRecords[word] = [record.id];
          } else {
            stemsToRecords[word].push(record.id);
          }
        }
      }

      for (const record of recordSet) {
        const { year } = record;
        if (yearsToRecords[year] === undefined) {
          yearsToRecords[year] = [record.id];
        } else {
          yearsToRecords[year].push(record.id);
        }
      }

      setRecordCount(count => count + recordSet.length);
    });
    return () => subscription.unsubscribe();
  }, [recordSet$]);

  return { recordCount, state };
};
