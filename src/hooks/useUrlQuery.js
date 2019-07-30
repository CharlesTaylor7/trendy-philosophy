import { useState, useRef } from 'react';
import * as R from 'ramda';
import { getNumberFromQueryId } from '../dataSources/textUtilities';

export const useUrlQuery = initialQuery => {

  const [dummy, setDummy] = useState(0);
  const ref = useRef(null);

  if (dummy === 0) {
    ref.current = new URLSearchParams();

    for (const [key, value] of Object.entries(initialQuery)) {
      ref.current.append(key, value);
    }
  }
  const urlSearchParams = ref.current;

  const incrementDummy = () => setDummy(dummy => dummy + 1);
  const syncWithURL = () => window.history.replaceState({}, '', `${window.location.pathname}?${urlSearchParams}`);

  const setQuery = (queryId, query) => {
    urlSearchParams.set(queryId, query);
    syncWithURL();
    incrementDummy();
  }

  const addQuery = () => {
    const lastQueryId = R.compose(
      R.last,
      R.keys,
    )(urlQuery);
    const queryId = lastQueryId !== undefined
      ? `q${getNumberFromQueryId(lastQueryId) + 1}`
      : 'q0';
    urlSearchParams.append(queryId, '');
    syncWithURL();
    incrementDummy();
  }

  const deleteQuery = queryId => {
    urlSearchParams.delete(queryId);
    syncWithURL();
    incrementDummy();
  }

  const urlQuery = R.fromPairs(Array.from(urlSearchParams.entries()));

  return { urlQuery, addQuery, setQuery, deleteQuery };
}
