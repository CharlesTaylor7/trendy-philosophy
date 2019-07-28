import React from 'react';
import { useRecordSets as useRecordSets } from '../dataSources/useRecords';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const Graph = ({ queries, yearRange, recordSet$, colorMap }) => {
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

  const getRecordIds = query => stemsToRecords[stem(query)] || [];

  const groupedByYear = R.pipe(
    R.toPairs,
    R.chain(([queryId, query]) =>
      R.map(
        id => ({ ...records[id], queryId }),
        getRecordIds(query)
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

  return (
    <LineChart width={1200} height={500} data={data}>
      <Tooltip />
      <XAxis dataKey="year"/>
      <YAxis />
      {queryIds
        .map(queryId => (
          <Line
            key={queryId}
            type="linear"
            dataKey={queryId}
            stroke ={colorMap[queryId]}
          />
        ))
      }
    </LineChart>
  );
}
