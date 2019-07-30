import React from 'react';
import './App.css';
import { Graph } from './Graph';
import { QueryBar } from './QueryBar';
import { recordSet$ } from '../dataSources/philPapers';
import { useUrlQuery } from '../hooks/useUrlQuery';

const colorMap = {
  q0: 'blue',
  q1: 'purple',
  q2: 'green',
  q3: 'grey',
  q4: 'pink',
  q5: 'yellow',
};

const defaultState = {q0: 'good', q1: 'governance'};

export const App = () => {
  const {
    urlQuery,
    addQuery,
    setQuery,
    deleteQuery
  } = useUrlQuery(defaultState);

  return (
    <div className="App">
      <QueryBar
        urlQuery={urlQuery}
        setQuery={setQuery}
        addQuery={addQuery}
        deleteQuery={deleteQuery}
        colorMap={colorMap}
      />
      <Graph
        queries={urlQuery}
        colorMap={colorMap}
        recordSet$={recordSet$}
        yearRange={[2000, 2018]}
      />
    </div>
  );
}
