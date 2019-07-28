import React, { useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const QueryInput = ({ index, setQuery, query }) => {

  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => { input$.subscribe(q => setQuery(index, q)); }, [input$, setQuery, index]);

  return (
    <label
      onChange={e => onInput(e.target.value)}
    >
      Trend line for:
      <input
        type="text"
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
    </label>
  );
};
