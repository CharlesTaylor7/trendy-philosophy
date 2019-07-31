import React from 'react';
import './NewQueryButton.css';

export const NewQueryButton = ({ onClick }) => {
  return (
    <button
      className="button button__new-query"
      onClick={onClick}
    >
      + query
    </button>
  )
}
