import React, { useState } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { QueryInput } from './components/QueryInput';
import { record$ } from './dataSources/philPapers';

export const App = () => {
  const [ query, setQuery ] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <QueryInput onInput={setQuery}/>
        <Graph
          query={query}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
