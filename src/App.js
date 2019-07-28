import React from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { QueryInput } from './components/QueryInput';
import { record$ } from './dataSources/philPapers';
import { useUrlSearchParams } from 'use-url-search-params';
import * as R from 'ramda';
export const App = () => {
  const [ queries, setQueries ] = useUrlSearchParams({ q0: 'good', q1: 'governance' });

  const addQuery = query =>
    setQueries(queries => ({
      ...queries,
      [`q${Object.keys(queries).length}`]: query
    }));

  const setQuery = (index, query) => {
    setQueries({
      ...queries,
      [index]: query,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        {R.pipe(
          R.toPairs,
          R.map(([index, query]) => (
            <QueryInput
              autoFocus
              key={index}
              index={index}
              setQuery={setQuery}
              query={query}
            />
          ))
        )(queries)}
        <Graph
          queries={queries}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
