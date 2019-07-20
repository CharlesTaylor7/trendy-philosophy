import React from 'react';
import './App.css';
import { Graph } from './components/Graph';

export const App = () => {
  const query = 'good';
  return (
    <div className="App">
      <header className="App-header">
        <p>Trending: "{query}"</p>
        <Graph query={query} yearRange={[2000, 2018]}/>
      </header>
    </div>
  );
}
