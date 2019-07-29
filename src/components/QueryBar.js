import React, { useMemo } from 'react';
import './QueryBar.css';
import { QueryInput } from './QueryInput';
import { NewQueryButton } from './NewQueryButton';
import * as R from 'ramda';

export const QueryBar = ({
  colorMap,
  urlQuery,
  setQuery,
  addQuery,
  deleteQuery,
}) => {
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
    [Object.values(urlQuery)]
  );

  return (
    <div className="query-bar">
      {queryInputs}
      <NewQueryButton onClick={addQuery}/>
    </div>
  );
};
