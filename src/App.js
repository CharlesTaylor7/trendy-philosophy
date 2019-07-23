import React, { useEffect } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { record$ } from './dataSources/philosophyPaperboy';

export const App = () => {
  const query = 'good';
  useEffect(() => {
    record$.subscribe(foo => console.log(foo));
  })
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Trending: "{query}"</p> */}
        <Graph query={query} yearRange={[2000, 2018]}/>
      </header>
    </div>
  );
}
