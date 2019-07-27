import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { QueryInput } from './components/QueryInput';
import { record$ } from './dataSources/philPapers';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const App = () => {
  const [ query, setQuery ] = useState('');

  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)));
  const onInput = input => input$.next(input);
  useEffect(() => input$.subscribe(setQuery), []);

  return (
    <div className="App">
      <header className="App-header">
        <QueryInput onInput={onInput}/>
        <Graph
          query={query}
          record$={record$}
          yearRange={[2000, 2018]}
        />
      </header>
    </div>
  );
}
