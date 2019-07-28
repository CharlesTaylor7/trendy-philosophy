import React from 'react';
import { useRecords } from '../dataSources/useRecords';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const Graph = ({ queries, yearRange, record$, colorMap }) => {
  const [ start, end ] = yearRange;
  const {
    records,
    stemsToRecords,
    yearsToRecords,
  } = useRecords(record$);

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
          const containingQuery = R.filter(R.propEq('queryId', queryId), group);
          const percentage = 100 * containingQuery.length / getTotal(year);
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
            type="linear"
            dataKey={queryId}
            stroke ={colorMap[queryId]}
            label={<Label />}
          />
        ))
      }
    </LineChart>
  );
}

const Label = ({
  x,
  y,
  stroke,
  value,
}) => (
  <text
    x={x}
    y={y}
    dy={-4}
    fill={stroke}
    fontSize={10}
    textAnchor="middle"
  >
    {value}
  </text>
);
