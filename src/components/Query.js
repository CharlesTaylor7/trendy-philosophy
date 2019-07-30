import React, { useEffect, useMemo } from 'react';
import './Query.css';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const Query = ({ tabIndex, setQuery, deleteQuery, query, color }) => {
  const input$ = useMemo(() => new Subject().pipe(debounceTime(400)), []);
  const onInput = input => input$.next(input);
  useEffect(() => {
    const subscription = input$.subscribe(setQuery);
    return () => subscription.unsubscribe();
  }, [input$]);

  return (
    <div className="query">
      <div
        className="query__color-indicator"
        style={{backgroundColor: color}}
      />
      <input className="query__input"
        tabIndex={tabIndex}
        autoFocus={tabIndex === 1}
        type="text"
        onChange={event => onInput(event.target.value)}
        placeholder="Search"
        defaultValue={query}
      />
      <button
        className="query__delete button"
        onClick={deleteQuery}
      >
        ×
      </button>
    </div>
  );
};
