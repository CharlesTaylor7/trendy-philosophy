import React from 'react';
import { usePhilPapers } from '../dataSources/useRecords';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const Graph = ({query, yearRange}) => {
  const [ start, end ] = yearRange;
  const {
    records,
    stemsToRecords,
    yearsToRecords,
  } = usePhilPapers();

  // const recordCount = Object.keys(records).length;
  const recordIds = stemsToRecords[stem(query)];
  // const data = recordIds
  //   ? R.pipe(
  //       R.map(id => records[id]),
  //       R.groupBy(R.prop('year')),
  //       R.toPairs,
  //       // R.filter(([year, _]) => year >= start && year <= end),
  //       R.map(([year, group]) => ({
  //         year,
  //         percentage: 100 * group.length / yearsToRecords[year].length,
  //       })),
  //       R.map(dataPoint => {
  //         return { ...dataPoint, amt: dataPoint.percentage };
  //       })
  //     )(recordIds)
  //   : [];
  const data = R.pipe(
    R.toPairs,
    R.map(([year, group]) => ({
      year,
      records: group.length,
    })),
    R.map(dataPoint => {
      return { ...dataPoint, amt: dataPoint.records };
    })
  )(yearsToRecords);
  // const getTotal = year => yearsToRecords[year]
  //   ? yearsToRecords[year].length
  //   : 0;

  return (
    <LineChart width={1200} height={500} data={data}>
      <Tooltip />
      <XAxis dataKey="year"/>
      <YAxis />
      <Line type="linear" dataKey="records" stroke ="#8484d8" label={<Label />}/>
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