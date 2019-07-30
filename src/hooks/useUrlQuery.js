import { useUrlSearchParams } from 'use-url-search-params';

export const useUrlQuery = initialQuery => {
  const [urlQuery, setUrlQuery] = useUrlSearchParams(initialQuery);

  const setQuery = (queryId, query) =>
    setUrlQuery({
      ...urlQuery,
      [queryId]: query,
    });

  const addQuery = () =>
    setQuery(`q${Object.keys(urlQuery).length}`, '');

  const deleteQuery = queryId => {
    const { [queryId]: _, ...rest } = urlQuery;
    setUrlQuery(rest);
  }

  return { urlQuery, addQuery, setQuery, deleteQuery };
}
