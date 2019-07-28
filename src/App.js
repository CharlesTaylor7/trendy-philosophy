import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { QueryInput } from './components/QueryInput';
import { record$ } from './dataSources/philPapers';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { useUrlSearchParams } from 'use-url-search-params';

export const App = () => {
  const [ { query }, setParams ] = useUrlSearchParams({ query: '' });
  const setQuery = query => setParams({query});

  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => { input$.subscribe(q => setQuery(q)); }, [input$, setQuery]);

  return (
    <div className="App">
      <header className="App-header">
        <QueryInput
          defaultValue={query}
          onInput={onInput}/>
        <Graph
          query={query}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
