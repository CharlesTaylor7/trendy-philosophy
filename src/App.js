import React, { useState, useRef } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { record$ } from './dataSources/philPapers';
import * as Observable from 'rxjs';

export const App = () => {
  const [ query, setQuery ] = useState('');

  const onChange = event => {
    console.log(event.target.value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <label>
            Trend for:
            <input
              type="text"
              onChange={onChange}
              autoFocus
              style={{
                margin:'10px',
                border: 0,
                outline: 0,
                fontSize: '16pt',
                color: 'white',
                background: 'transparent',
                borderBottom: '1px solid grey',
              }}
            />
          </label>
        <Graph
          query={query}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
