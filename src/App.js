import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { usePhilPapers } from './philPapers/usePhilPapers';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';
import * as R from 'ramda';
import stem from 'lancaster-stemmer';

export const App = () => {
  const {
    records,
    stemsToRecords,
    yearsToRecords,
  } = usePhilPapers();

  const recordCount = Object.keys(records).length;
  const queryWord = 'problem';
  const recordIds = stemsToRecords[stem(queryWord)];
  const data = recordIds
    ? R.pipe(
        R.map(id => records[id]),
        R.groupBy(R.prop('year')),
        R.toPairs,
        R.map(([year, group]) => ({
          year,
          percentage: 100 * group.length / yearsToRecords[year].length,
        })),
        R.map(dataPoint => {
          return { ...dataPoint, amt: dataPoint.percentage };
        })
      )(recordIds)
    : [];
  return (
    <div className="App">
      <header className="App-header">
        <p>Trending: "{queryWord}" (Checked against {recordCount} records)</p>
        <LineChart width={1200} height={500} data={data}>
          <XAxis dataKey="year"/>
          <YAxis />
          <Line type="monotone" dataKey="percentage" stroke="#8484d8" />
        </LineChart>
      </header>
    </div>
  );
}
