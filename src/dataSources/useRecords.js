import { useState, useEffect, useRef } from 'react';
import * as R from 'ramda';
import stemmer from 'lancaster-stemmer';
import { splitOn, blackList, propNames } from './textUtilities';

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
  // We've implemented our data store as a large mutable ref.
  // We have no interest in old versions of the data
  // and the constant copying & spreading caused significant slowdown.
  // We track the total count of records with the useState hook to enforce that rerenders occur when new data is loaded.

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

        for (const word of getWords(record)) {
          if (stemsToRecords[word] === undefined) {
            stemsToRecords[word] = [record.id];
          } else {
            stemsToRecords[word].push(record.id);
          }
        }

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
