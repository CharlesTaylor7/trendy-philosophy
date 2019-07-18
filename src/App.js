import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchCategories, fetchRecords } from './philPapersAPI';

export const App = () => {
  const [ state, setState ] = useState();
  console.log(state);
  useEffect(() => {
    fetchCategories()
      .then(results => results.json())
      .then(setState);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {state && state.map
            ? state
              .map(array => array[0])
              .sort()
              .join(', ')
            : null
          }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
