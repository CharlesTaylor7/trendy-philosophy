import { useState, useEffect } from 'react';
import { record$ } from './streams';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const usePhilPapers = () => {
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
    record$.subscribe(record => {
      const blackList = /^([0-9]+|s|the|of|on|and|to|in|at|for)$/;
      const splitOn = /[\s,.\-_'’]/;
      const propNames = ['title', 'description'];

      const words = R.pipe(
        R.chain(propName => record[propName].split(splitOn)),
        R.map(stem),
        R.filter(stem => !R.isEmpty(stem) && R.isEmpty(R.match(blackList, stem))),
        R.uniq,
      )(propNames);

      setState(state => {
        const { stemsToRecords, yearsToRecords, records } = state;

        const updatedRecords = {...records, [record.id]: record};

        const stems = { ...stemsToRecords };
        for (const word of words) {
          if (stems[word] === undefined) {
            stems[word] = [record.id];
          } else {
            stems[word] = [...stems[word], record.id];
          }
        }

        const years = { ...yearsToRecords };
        const { year } = record;
        if (years[year] === undefined) {
          years[year] = [record.id];
        } else {
          years[year] = [...years[year], record.id];
        }

        return {
          records: updatedRecords,
          stemsToRecords: stems,
          yearsToRecords: years,
        };
      });
    });
  }, []);

  return state;
};
