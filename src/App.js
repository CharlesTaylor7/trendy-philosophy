import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { usePhilPapers } from './philPapers/usePhilPapers';

export const App = () => {
  const state = usePhilPapers();

  console.log(state.recordCount);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello!
        </p>
      </header>
    </div>
  );
}
