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

export const Graph = ({queries, yearRange, record$}) => {
  const [ start, end ] = yearRange;
  const {
    records,
    stemsToRecords,
    yearsToRecords,
  } = useRecords(record$);

  const recordIds = stemsToRecords[stem(query)];

  const getTotal = year => yearsToRecords[year]
    ? yearsToRecords[year].length
    : 0;

  const data = recordIds
    ? R.pipe(
        R.map(id => records[id]),
        R.groupBy(R.prop('year')),
        R.toPairs,
        R.filter(([year, _]) => year >= start && year <= end),
        R.map(([year, group]) => ({
          year,
          percentage: 100 * group.length / getTotal(year),
        })),
        R.map(dataPoint => {
          return { ...dataPoint, amt: dataPoint.percentage };
        })
      )(recordIds)
    : [];

  return (
    <LineChart width={1200} height={500} data={data}>
      <Tooltip />
      <XAxis dataKey="year"/>
      <YAxis />
      <Line type="linear" dataKey="percentage" stroke ="#8484d8" label={<Label />}/>
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
