import React from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { QueryInput } from './components/QueryInput';
import { record$ } from './dataSources/philPapers';
import { useUrlSearchParams } from 'use-url-search-params';
import * as R from 'ramda';

const colorMap = {
  q0: 'blue',
  q1: 'purple',
  q2: 'green',
  q3: 'grey',
};

export const App = () => {
  const [ queries, setQueries ] = useUrlSearchParams({});

  const addQuery = query =>
    setQueries(queries => ({
      ...queries,
      [`q${Object.keys(queries).length}`]: query
    }));

  const setQuery = (queryId, query) => {
    setQueries({
      ...queries,
      [queryId]: query,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        {R.pipe(
          R.toPairs,
          R.map(([queryId, query]) => (
            <QueryInput
              autoFocus
              key={queryId}
              id={queryId}
              color={colorMap[queryId]}
              query={query}
              setQuery={setQuery}
            />
          ))
        )(queries)}
        <Graph
          queries={queries}
          colorMap={colorMap}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
