import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Graph } from './Graph';
import { QueryInput } from './QueryInput';
import { NewQueryButton } from './NewQueryButton';
import { recordSet$ } from '../dataSources/philPapers';
import { useUrlQuery } from '../hooks/useUrlQuery';
import * as R from 'ramda';

const colorMap = {
  q0: 'blue',
  q1: 'purple',
  q2: 'green',
  q3: 'grey',
};

const defaultState = {q0: 'good', q1: 'governance'};

export const App = () => {
  const {
    urlQuery,
    addQuery,
    setQuery,
    deleteQuery
  } = useUrlQuery(defaultState);

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
        {/* <NewQueryButton/> */}
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
