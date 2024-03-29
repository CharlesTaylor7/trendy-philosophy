import { useRecordSets } from '../hooks/useRecordSets';
import * as R from 'ramda';
import stemmer from 'lancaster-stemmer';
import { splitOn, blackList, propNames } from '../dataSources/textUtilities';

export const useGraphData = ({recordSet$, yearRange, queries}) => {
  const [ start, end ] = yearRange;
  const {
    recordCount,
    state,
  } = useRecordSets(recordSet$);
  const {
    records,
    stemsToRecords,
    yearsToRecords,
  } = state.current;

  const queryIds = Object.keys(queries);
  const getTotal = year => yearsToRecords[year]
    ? yearsToRecords[year].length
    : 0;

  const getRecordIds = query => {
    const recordIdSets = R.pipe(
      R.split(splitOn),
      R.map(stemmer),
      R.filter(stem =>
        !R.isEmpty(stem) &&
        R.isEmpty(R.match(blackList, stem))),
      R.map(stem => stemsToRecords[stem] || []),
    )(query);
    // using Array#.reduce instead of Ramda reduce
    // because there's not a good seed argument I can provide.
    return recordIdSets.length
      ? recordIdSets.reduce(R.intersection)
      : [];
  };
  const includesCaseInsensitive = (title, query) =>
    title.toLowerCase().includes(query.toLowerCase());

  const getRecords = query =>
    R.pipe(
    getRecordIds,
      R.map(id => records[id]),
      R.filter(record =>
        R.any(prop =>
          includesCaseInsensitive(record[prop], query), propNames)
      ),
    )(query)

  const groupedByYear = R.pipe(
    R.toPairs,
    R.chain(([queryId, query]) =>
      R.map(
        record => ({ ...record, queryId }),
        getRecords(query)
      )
    ),
    R.groupBy(R.prop('year'))
  )(queries);

  const data = R.map(
    year => {
      const group = groupedByYear[year] || [];
      const dataPoint = R.pipe(
        R.map(queryId => {
          const total = getTotal(year);
          if (total === 0) return [queryId, 0];
          const containingQuery = R.filter(R.propEq('queryId', queryId), group);
          const percentage = 100 * containingQuery.length / total;
          return [queryId, percentage];
        }),
        R.fromPairs,
      )(queryIds);
      dataPoint.year = year;
      return dataPoint;
    },
    R.range(start, end + 1)
  );
  return data;
}