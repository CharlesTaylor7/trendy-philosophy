import React from 'react';
import "./Graph.css";
import {
  ResponsiveContainer,
  Label,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';

export const Graph = ({ queryIds, colorMap, data }) => {
  return (
    <div className="graph">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip />
          <XAxis dataKey="year" height={50} >
            <Label
              angle={0}
              value='year'
              position='insideTop'
              offset={30}
              style={{textAnchor: 'middle'}}
            />
          </XAxis>
          <YAxis>
            <Label
              angle={-90}
              value='percentage (%)'
              position='insideLeft'
              style={{textAnchor: 'middle'}}
            />
          </YAxis>
          {queryIds
            .map(queryId => (
              <Line
                key={queryId}
                type="linear"
                dataKey={queryId}
                stroke ={colorMap[queryId]}
                strokeWidth={3}
                dot={false}
              />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
