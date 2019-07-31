import React from 'react';
import './App.css';
import { Graph } from './Graph';
import { QueryBar } from './QueryBar';
import { recordSet$ } from '../dataSources/philPapers';
import { useUrlQuery } from '../hooks/useUrlQuery';
import { useGraphData } from '../hooks/useGraphData';

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

  const yearRange = [2010, 2019];
  const data = useGraphData({ recordSet$, yearRange, queries: urlQuery });

  const queryIds = Object.keys(urlQuery);

  return (
    <div className="App">
      <header className="header">
        <QueryBar
          urlQuery={urlQuery}
          setQuery={setQuery}
          addQuery={addQuery}
          deleteQuery={deleteQuery}
          colorMap={colorMap}
        />
      </header>
      <footer className="footer">
        <Graph
          queryIds={Object.keys(urlQuery)}
          colorMap={colorMap}
          data={data}
        />
      </footer>
    </div>
  );
}
