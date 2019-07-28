import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { QueryInput } from './components/QueryInput';
import { recordSet$ } from './dataSources/philPapers';
import { useUrlSearchParams } from 'use-url-search-params';
import * as R from 'ramda';

const colorMap = {
  q0: 'blue',
  q1: 'purple',
  q2: 'green',
  q3: 'grey',
};

const defaultState = {q0: 'good', q1: 'governance'};

export const App = () => {
  const [ urlQuery, setUrlQuery ] = useUrlSearchParams(defaultState);

  const addQuery = query =>
    setUrlQuery(({
      ...urlQuery,
      [`q${Object.keys(urlQuery).length}`]: query
    }));

  const setQuery = (queryId, query) =>
    setUrlQuery({
      ...urlQuery,
      [queryId]: query,
    });

  const queryInputs = useMemo(() =>
    R.pipe(
      R.toPairs,
      R.map(([queryId, query]) => (
        <QueryInput
          key={queryId}
          id={queryId}
          color={colorMap[queryId]}
          query={query}
          setQuery={setQuery}
        />
      ))
    )(urlQuery),
    [urlQuery]
  );
  return (
    <div className="App">
      <header className="App-header">
        {queryInputs}
        <Graph
          queries={urlQuery}
          colorMap={colorMap}
          recordSet$={recordSet$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
