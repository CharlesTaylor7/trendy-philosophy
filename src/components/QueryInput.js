import React, { useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const QueryInput = ({ id, setQuery, query, color }) => {

  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => {
    input$.subscribe(q => setQuery(id, q));
  }, [input$, setQuery, id]);

  const tabIndex = Number(id[1] + 1);
  const autoFocus = tabIndex === 1;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <div
        style={{
          height: '17px',
          width: '17px',
          borderRadius: '100%',
          backgroundColor: color,
          margin: '0px 20px',
        }}
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
