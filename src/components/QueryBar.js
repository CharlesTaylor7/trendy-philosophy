import React, { useMemo } from 'react';
import './QueryBar.css';
import { Query } from './Query';
import { NewQueryButton } from './NewQueryButton';
import * as R from 'ramda';
import { getNumberFromQueryId } from '../dataSources/textUtilities';

export const QueryBar = ({
  colorMap,
  urlQuery,
  setQuery,
  addQuery,
  deleteQuery,
}) => {
  const queryAsString = Object.values(urlQuery).join('&');
  const queryInputs = useMemo(() =>
    R.pipe(
      R.toPairs,
      R.map(([queryId, query]) => (
        <Query
          key={queryId}
          tabIndex={getNumberFromQueryId(queryId) + 1}
          color={colorMap[queryId]}
          query={query}
          setQuery={query => setQuery(queryId, query)}
          deleteQuery={() => deleteQuery(queryId)}
        />
      ))
    )(urlQuery)

  );

  return (
    <div className="query-bar">
      {queryInputs}
      <NewQueryButton onClick={addQuery}/>
    </div>
  );
};
