import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { record$ } from './philPapersAPI';
import * as R from 'ramda';

export const App = () => {
  // state: { [stem: string]: RecordId[] }
  // where RecordId = string
  // a map from word stems to a list of records containing that stem.
  // The frequency of a stem is size of its dictionary entry divided by the record count.
  const [ state, setState ] = useState({});
  const [ recordCount, setRecordCount ] = useState(0);

  useEffect(() => {
    record$.subscribe(record => {

      const words = R.pipe(
        R.prop('title'),
        R.split(' '),
        R.map(R.toLower),
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
        console.log(JSON.stringify(copy));
        debugger;
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
