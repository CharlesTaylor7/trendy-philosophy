import { useState, useEffect } from 'react';
import { record$ } from './streams';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const usePhilPapers = () => {
  // state: { lookup: { [stem: string]: RecordId[] }, recordCount: number }
  // where RecordId = string
  // a map from word stems to a list of records containing that stem.
  // The frequency of a stem is size of its dictionary entry divided by the record count.
  const [ state, setState ] = useState({ stemsToRecords: {}, records: {} });

  useEffect(() => {
    record$.subscribe(record => {
      const blackList = /^([0-9]+|the|of|on|and|to|in|at|for)$/
      const words = R.pipe(
        R.prop('title'),
        R.split(/[\s,.\-_]/),
        R.map(stem),
        R.filter(R.pipe(R.match(blackList), R.isEmpty)),
        R.uniq,
      )(record);

      setState(state => {
        const { stemsToRecords, records } = state;
        const copy = { ...stemsToRecords };
        for (const word of words) {
          if (copy[word] === undefined) {
            copy[word] = [record.id];
          } else {
            copy[word] = [...copy[word], record.id];
          }
        }
        const withNewRecord = {...records, [record.id]: record}
        return { stemsToRecords: copy, records: withNewRecord };
      });
    });
  }, []);

  return state;
};
