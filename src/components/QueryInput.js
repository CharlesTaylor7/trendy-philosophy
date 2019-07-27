import React from 'react';

export const QueryInput = ({ onInput }) => (
  <label
    onChange={e => onInput(e.target.value)}
  >
    Trend line for:
    <input
      type="text"
      autoFocus
      style={{
        margin:'10px',
        border: 0,
        outline: 0,
        fontSize: '16pt',
        color: 'white',
        background: 'transparent',
        borderBottom: '1px solid grey',
      }}
    />
  </label>
);
