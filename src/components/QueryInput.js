import React, { useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const QueryInput = ({ id, setQuery, query, color }) => {

  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => {
    input$.subscribe(q => setQuery(id, q));
  }, [input$, setQuery, id]);

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
      Trend line for:
      <input
        type="text"
        onChange={e => onInput(e.target.value)}
        defaultValue={query}
        style={{
          margin:'10px',
          border: 0,
          outline: 0,
          fontSize: '16pt',
          color: 'white',
          background: 'transparent',
          borderBottom: '1px solid grey',
        }}
      />
    </div>
  );
};
