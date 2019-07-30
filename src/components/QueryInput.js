import React, { useEffect, useMemo } from 'react';
import './QueryInput.css';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const QueryInput = ({ id, setQuery, query, color }) => {

  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => {
    input$.subscribe(q => setQuery(id, q));
  }, [input$, id]);

  const tabIndex = Number(id.match(/^q(?<index>\d+)$/).groups.index) + 1;
  const autoFocus = tabIndex === 1;
  return (
    <div className="query">
      <div
        className="color-indicator"
        style={{backgroundColor: color}}
      />
      <input
        tabIndex={tabIndex}
        autoFocus={autoFocus}
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
