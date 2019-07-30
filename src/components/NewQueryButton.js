import React from 'react';
import './NewQueryButton.css';

export const NewQueryButton = ({ onClick }) => {
  return (
    <button
      className="button"
      onClick={onClick}
    >
      + Query
    </button>
  )
}
