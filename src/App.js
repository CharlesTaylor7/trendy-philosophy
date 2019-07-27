import React, { useState } from 'react';
import './App.css';
import { Graph } from './components/Graph';
// import { record$ } from './dataSources/philosophyPaperboy';
import { record$ } from './dataSources/philPapers';

export const App = () => {
  const [ query, setQuery ] = useState('');

  const onChange = event => setQuery(event.target.value);

  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Trending: "{query}"</p> */}
        <label>
            Trend for:
            <input
              type="text"
              value={query}
              onChange={onChange}
              style={{margin:'10px'}}
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
