import React, { useEffect, useMemo } from 'react';
import './QueryInput.css';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const QueryInput = ({ tabIndex, setQuery, query, color }) => {
  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => {
    const subscription = input$.subscribe(setQuery);
    return () => subscription.unsubscribe();
  }, [input$]);

  return (
    <div className="query">
      <div
        className="color-indicator"
        style={{backgroundColor: color}}
      />
      <input
        tabIndex={tabIndex}
        autoFocus={tabIndex === 1}
        type="text"
        onChange={event => onInput(event.target.value)}
        placeholder="Search"
        defaultValue={query}
        style={{
          margin:'10px',
          border: 0,
          outline: 0,
          font: 'inherit',
          color: 'white',
          background: 'transparent',
        }}
      />
    </div>
  );
};
