import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const apiId = '904518';
const apiKey = '5KLo4qkvXNl4t8s5';

export const App = () => {
  const [ state, setState ] = useState();
  console.log(state);
  useEffect(() => {
    fetch(`https://philpapers.org/philpapers/raw/categories.json?apiId=${apiId}&apiKey=${apiKey}`)
      .then(results => results.json())
      .then(setState);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
