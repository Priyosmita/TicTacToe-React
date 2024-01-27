import React, { useState } from 'react';
import Board from './Board';
import ResetButton from './ResetButton';
import './SinglePlayerGame.css'

const MultiPlayerGame = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner);
    }

  };

  const playClickSound = () => {
    const audio = new Audio('../../pagetrans.mp3');
    audio.play();
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
};

  const status = winner
    ? `Winner: ${winner}`
    : squares.every((square) => square !== null)
    ? 'It\'s a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
      <div className='def'>
        <span className='abc'>
        Multi Player Mode
        </span>
        <div className="status">{status}</div>
        <Board squares={squares} onClick={handleClick} />
        <div className='spmbuttons'>
        <ResetButton onClick={() => { resetBoard(); playClickSound(); }}></ResetButton>
        <button className='link' onClick={playClickSound}>
            <a href='/' className='underlineremove'>Main Menu</a>
        </button>
        </div>
      </div>
    );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default MultiPlayerGame;