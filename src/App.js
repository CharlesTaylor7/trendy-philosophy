import React, { useEffect } from 'react';
import './App.css';
import { Graph } from './components/Graph';
// import { record$ } from './dataSources/philosophyPaperboy';
import { record$ } from './dataSources/philPapers';

export const App = () => {
  const query = 'family';
  return (
    <div className="App">
      <header className="App-header">
        <p>Trending: "{query}"</p>
        <Graph
          query={query}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
