import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchCategories, fetchRecords } from './philPapersAPI';

export const App = () => {
  const [ state, setState ] = useState();
  console.log(state);

  useEffect(() => {
    fetchCategories().then(setState);
    // fetchRecords();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {state && state.map
            ? state
              .map(array => array[0])
              .slice(0, 20)
              .join(', ')
            : null
          }
        </p>
      </header>
    </div>
  );
}
