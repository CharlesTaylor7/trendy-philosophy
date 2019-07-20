import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { record$ } from './philPapersAPI';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const App = () => {
  // state: { [stem: string]: RecordId[] }
  // where RecordId = string
  // a map from word stems to a list of records containing that stem.
  // The frequency of a stem is size of its dictionary entry divided by the record count.
  const [ state, setState ] = useState({});
  const [ recordCount, setRecordCount ] = useState(0);

  console.log(recordCount)
  console.log(JSON.stringify(state));

  useEffect(() => {
    record$.subscribe(record => {
      const blackList = /^(the|of|on|and|to|in)$/
      const words = R.pipe(
        R.prop('title'),
        R.split(/[\s,.\-_]/),
        R.map(stem),
        R.filter(R.pipe(R.match(blackList), R.isEmpty)),
        R.uniq,
      )(record);

      setState(state => {
        const copy = { ...state };
        for (const word of words) {
          if (copy[word] === undefined) {
            copy[word] = [record.id];
          } else {
            copy[word] = [...copy[word], record.id];
          }
        }
        return copy;
      });
      setRecordCount(count => count + 1);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello!
        </p>
      </header>
    </div>
  );
}
