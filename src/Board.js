// Board.js

import React from 'react';
import './Board.css';

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return (
      <button className={`square ${squares[i] ? squares[i].toLowerCase() : ''}`} onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
