import { useUrlSearchParams } from 'use-url-search-params';

export const useUrlQuery = initialQuery => {
  const [urlQuery, setUrlQuery_] = useUrlSearchParams(initialQuery);

  const setUrlQuery = query => {
    console.log(query);
    setUrlQuery_(query);
  }
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
